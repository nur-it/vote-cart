import { createHash } from "crypto";
import { db } from "./db";
import { SEED_SECTIONS } from "./poll-data";
import { autoTranslatePair } from "./translate";
import type { OptionResult, PollResult, SectionColor, SectionResult } from "./types";

export type Lang = "en" | "ru";

function resolveI18n(json: unknown, lang: Lang): string {
  if (json && typeof json === "object") {
    const map = json as Record<string, string>;
    return map[lang] ?? map["en"] ?? "";
  }
  return "";
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

let isSeededInMemory = false;

export async function ensureSeeded(): Promise<void> {
  if (isSeededInMemory) return;

  const sectionCount = await db.section.count();
  if (sectionCount === 0) {
    for (let s = 0; s < SEED_SECTIONS.length; s++) {
      const section = SEED_SECTIONS[s];
      const created = await db.section.create({
        data: {
          slug: section.slug,
          name: section.name,
          description: section.description,
          name_i18n: { en: section.name_en, ru: section.name_ru },
          desc_i18n: { en: section.desc_en, ru: section.desc_ru },
          icon: section.icon,
          color: section.color,
          order: s,
        },
      });

      await db.option.createMany({
        data: section.options.map((opt, i) => ({
          sectionId: created.id,
          slug: opt.slug,
          name: opt.name,
          emoji: opt.emoji,
          imageUrl: opt.imageUrl ?? null,
          description: opt.description,
          name_i18n: { en: opt.name_en, ru: opt.name_ru },
          desc_i18n: { en: opt.desc_en, ru: opt.desc_ru },
          votes: 0,
          order: i,
        })),
      });
    }
  }

  isSeededInMemory = true;
}

export async function computeResults(votedOptionIds: string[] = [], lang: Lang = "en"): Promise<PollResult> {
  await ensureSeeded();

  const [sections, voterCount] = await Promise.all([
    db.section.findMany({
      orderBy: { order: "asc" },
      include: { options: { orderBy: { order: "asc" } } },
    }),
    db.vote.count(),
  ]);

  const totalVotes = sections.reduce(
    (sum, s) => sum + s.options.reduce((a, o) => a + o.votes, 0),
    0
  );

  const sectionResults: SectionResult[] = sections.map((s) => {
    const sectionTotal = s.options.reduce((a, o) => a + o.votes, 0);
    const sorted = [...s.options].sort((a, b) => b.votes - a.votes);
    const rankMap = new Map(sorted.map((o, i) => [o.id, i + 1]));
    const leading = sorted[0] ?? null;

    const sectionName = resolveI18n(s.name_i18n, lang) || s.name;
    const sectionDesc = resolveI18n(s.desc_i18n, lang) || s.description;

    const options: OptionResult[] = s.options.map((o) => ({
      id: o.id,
      sectionId: s.id,
      slug: o.slug,
      name: resolveI18n(o.name_i18n, lang) || o.name,
      emoji: o.emoji,
      imageUrl: o.imageUrl,
      description: resolveI18n(o.desc_i18n, lang) || o.description,
      votes: o.votes,
      percentage: sectionTotal > 0 ? Math.round((o.votes / sectionTotal) * 1000) / 10 : 0,
      rank: rankMap.get(o.id) ?? 0,
      isLeading: leading ? o.id === leading.id : false,
      isCustom: o.isCustom,
      createdById: o.createdById,
    }));

    options.sort((a, b) => b.votes - a.votes);

    return {
      id: s.id,
      slug: s.slug,
      name: sectionName,
      description: sectionDesc,
      icon: s.icon,
      color: s.color as SectionColor,
      order: s.order,
      options,
      totalVotes: sectionTotal,
      leadingOptionName: leading ? (resolveI18n(leading.name_i18n, lang) || leading.name) : null,
      leadingOptionPercentage:
        leading && sectionTotal > 0
          ? Math.round((leading.votes / sectionTotal) * 1000) / 10
          : null,
    };
  });

  const allOptions = sectionResults.flatMap((s) => s.options);
  const top = allOptions.length && allOptions.some((o) => o.votes > 0)
    ? allOptions.reduce((a, b) => (b.votes > a.votes ? b : a))
    : null;
  const topSection = top ? sectionResults.find((s) => s.id === top.sectionId) ?? null : null;

  return {
    sections: sectionResults,
    totalVotes,
    voterCount,
    optionCount: allOptions.length,
    hasVoted: votedOptionIds.length > 0,
    votedOptionIds,
    topOption: top
      ? { name: top.name, emoji: top.emoji, percentage: top.percentage, sectionName: topSection?.name ?? "" }
      : null,
  };
}

export async function getVoteByIp(ipHash: string) {
  return db.vote.findUnique({ where: { ip: ipHash } });
}

export async function undoVote(optionIds: string[], ipHash: string): Promise<void> {
  await db.$transaction([
    db.option.updateMany({
      where: { id: { in: optionIds } },
      data: { votes: { decrement: 1 } },
    }),
    db.vote.delete({ where: { ip: ipHash } }),
  ]);
}

export async function castVote(
  optionIds: string[],
  ipHash: string,
  voter: { name: string; email: string; phone?: string }
): Promise<{ ok: boolean; reason?: string }> {
  if (!optionIds.length) return { ok: false, reason: "No options selected" };
  if (!voter.name?.trim()) return { ok: false, reason: "Name is required" };
  if (!voter.email?.trim()) return { ok: false, reason: "Email is required" };

  const existing = await db.vote.findUnique({ where: { ip: ipHash } });
  if (existing) return { ok: false, reason: "already_voted" };

  const valid = await db.option.findMany({
    where: { id: { in: optionIds } },
    select: { id: true },
  });
  if (valid.length !== optionIds.length) {
    return { ok: false, reason: "Some options are invalid" };
  }

  const cleanEmail = voter.email.toLowerCase().trim();
  const cleanName = voter.name.trim();
  const cleanPhone = voter.phone?.trim() || null;

  // Upsert user so repeat visits / profile changes update gracefully
  const user = await db.user.upsert({
    where: { email: cleanEmail },
    update: {
      name: cleanName,
      ...(cleanPhone ? { phone: cleanPhone } : {}),
    },
    create: {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
    },
  });

  await db.$transaction([
    db.option.updateMany({
      where: { id: { in: optionIds } },
      data: { votes: { increment: 1 } },
    }),
    db.vote.create({
      data: {
        userId: user.id,
        ip: ipHash,
        optionIds,
        optionCount: optionIds.length,
      },
    }),
  ]);

  return { ok: true };
}

function toSlug(name: string): string {
  return (
    name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) ||
    "custom"
  );
}

function randomSuffix(len = 4): string {
  return Math.random().toString(36).slice(2, 2 + len);
}

export async function addCustomOption(
  sectionId: string,
  rawName: string,
  rawDesc?: string,
  emoji: string = "✨",
  imageUrl?: string,
  createdById?: string,
  votedOptionIds: string[] = [],
  lang: Lang = "en"
): Promise<{
  option: {
    id: string;
    sectionId: string;
    name: string;
    description: string;
    emoji: string;
    imageUrl?: string | null;
    isCustom: boolean;
    createdById?: string | null;
    created: boolean;
  };
  poll: PollResult;
}> {
  await ensureSeeded();

  const section = await db.section.findUnique({ where: { id: sectionId } });
  if (!section) throw new Error("Section not found");

  const name = rawName.trim().replace(/\s+/g, " ").slice(0, 80);
  if (!name) throw new Error("Option name is required");

  const desc = (rawDesc || "Community-suggested product.").trim().replace(/\s+/g, " ").slice(0, 300);

  const existing = await db.option.findMany({
    where: { sectionId },
    select: { id: true, name: true, description: true, emoji: true, imageUrl: true, isCustom: true, createdById: true },
  });
  const match = existing.find((o) => o.name.toLowerCase() === name.toLowerCase());

  let option;
  if (match) {
    option = {
      id: match.id,
      sectionId,
      name: match.name,
      description: match.description,
      emoji: match.emoji,
      imageUrl: match.imageUrl,
      isCustom: match.isCustom,
      createdById: match.createdById,
      created: false,
    };
  } else {
    let slug = `${toSlug(name)}-${randomSuffix()}`;
    const clash = await db.option.findUnique({ where: { slug } });
    if (clash) slug = `${toSlug(name)}-${randomSuffix(6)}`;

    // Perform bilingual translation in parallel
    const [namePair, descPair] = await Promise.all([
      autoTranslatePair(name),
      autoTranslatePair(desc),
    ]);

    const created = await db.option.create({
      data: {
        sectionId,
        slug,
        name,
        emoji: emoji || "✨",
        imageUrl: imageUrl?.trim() || null,
        description: desc,
        name_i18n: namePair,
        desc_i18n: descPair,
        votes: 0,
        order: existing.length,
        isCustom: true,
        createdById: createdById || null,
      },
    });

    option = {
      id: created.id,
      sectionId,
      name: resolveI18n(created.name_i18n, lang) || created.name,
      description: resolveI18n(created.desc_i18n, lang) || created.description,
      emoji: created.emoji,
      imageUrl: created.imageUrl,
      isCustom: true,
      createdById: created.createdById,
      created: true,
    };
  }

  const poll = await computeResults(votedOptionIds, lang);
  return { option, poll };
}

export async function editCustomOption(
  optionId: string,
  rawName: string,
  rawDesc?: string,
  emoji?: string,
  imageUrl?: string,
  guestId?: string,
  votedOptionIds: string[] = [],
  lang: Lang = "en"
): Promise<{ option: OptionResult; poll: PollResult }> {
  await ensureSeeded();

  const existing = await db.option.findUnique({ where: { id: optionId } });
  if (!existing) throw new Error("Product not found");
  if (!existing.isCustom) throw new Error("Default options cannot be edited");

  // Verify ownership if createdById is present
  if (existing.createdById && guestId && existing.createdById !== guestId) {
    throw new Error("You can only edit products you created");
  }

  const name = rawName.trim().replace(/\s+/g, " ").slice(0, 80);
  if (!name) throw new Error("Product title is required");

  const desc = (rawDesc || existing.description).trim().replace(/\s+/g, " ").slice(0, 300);

  // Parallel translations
  const [namePair, descPair] = await Promise.all([
    autoTranslatePair(name),
    autoTranslatePair(desc),
  ]);

  const updated = await db.option.update({
    where: { id: optionId },
    data: {
      name,
      description: desc,
      emoji: emoji || existing.emoji,
      imageUrl: imageUrl !== undefined ? (imageUrl.trim() || null) : existing.imageUrl,
      name_i18n: namePair,
      desc_i18n: descPair,
    },
  });

  const poll = await computeResults(votedOptionIds, lang);
  const foundOption = poll.sections.flatMap((s) => s.options).find((o) => o.id === updated.id);

  if (!foundOption) throw new Error("Failed to resolve updated option");

  return { option: foundOption, poll };
}

export async function deleteCustomOption(
  optionId: string,
  guestId?: string,
  votedOptionIds: string[] = [],
  lang: Lang = "en"
): Promise<PollResult> {
  await ensureSeeded();

  const existing = await db.option.findUnique({ where: { id: optionId } });
  if (!existing) throw new Error("Product not found");
  if (!existing.isCustom) throw new Error("Default options cannot be deleted");

  if (existing.createdById && guestId && existing.createdById !== guestId) {
    throw new Error("You can only delete products you created");
  }

  await db.option.delete({ where: { id: optionId } });

  return computeResults(votedOptionIds, lang);
}

