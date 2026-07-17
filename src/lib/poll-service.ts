import { createHash } from "crypto";
import { db } from "./db";
import { SEED_SECTIONS } from "./poll-data";
import type { OptionResult, PollResult, SectionColor, SectionResult } from "./types";

// Hash IP so raw IPs are never stored
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

// Seed only sections + options (no fake votes, no fake voters)
export async function ensureSeeded(): Promise<void> {
  const sectionCount = await db.section.count();
  if (sectionCount > 0) return;

  for (let s = 0; s < SEED_SECTIONS.length; s++) {
    const section = SEED_SECTIONS[s];
    const created = await db.section.create({
      data: {
        slug: section.slug,
        name: section.name,
        description: section.description,
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
        description: opt.description,
        votes: 0,
        order: i,
      })),
    });
  }
}

export async function computeResults(votedOptionIds: string[] = []): Promise<PollResult> {
  await ensureSeeded();

  const sections = await db.section.findMany({
    orderBy: { order: "asc" },
    include: { options: { orderBy: { order: "asc" } } },
  });

  const totalVotes = sections.reduce(
    (sum, s) => sum + s.options.reduce((a, o) => a + o.votes, 0),
    0
  );

  const voterCount = await db.vote.count();

  const sectionResults: SectionResult[] = sections.map((s) => {
    const sectionTotal = s.options.reduce((a, o) => a + o.votes, 0);
    const sorted = [...s.options].sort((a, b) => b.votes - a.votes);
    const rankMap = new Map(sorted.map((o, i) => [o.id, i + 1]));
    const leading = sorted[0] ?? null;

    const options: OptionResult[] = s.options.map((o) => ({
      id: o.id,
      sectionId: s.id,
      slug: o.slug,
      name: o.name,
      emoji: o.emoji,
      description: o.description,
      votes: o.votes,
      percentage: sectionTotal > 0 ? Math.round((o.votes / sectionTotal) * 1000) / 10 : 0,
      rank: rankMap.get(o.id) ?? 0,
      isLeading: leading ? o.id === leading.id : false,
      isCustom: o.isCustom,
    }));

    options.sort((a, b) => b.votes - a.votes);

    return {
      id: s.id,
      slug: s.slug,
      name: s.name,
      description: s.description,
      icon: s.icon,
      color: s.color as SectionColor,
      order: s.order,
      options,
      totalVotes: sectionTotal,
      leadingOptionName: leading ? leading.name : null,
      leadingOptionPercentage:
        leading && sectionTotal > 0
          ? Math.round((leading.votes / sectionTotal) * 1000) / 10
          : null,
    };
  });

  const allOptions = sectionResults.flatMap((s) => s.options);
  const top = allOptions.length ? allOptions.reduce((a, b) => (b.votes > a.votes ? b : a)) : null;
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

// Returns existing vote record for this IP hash, or null
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
  ipHash: string
): Promise<{ ok: boolean; reason?: string }> {
  if (!optionIds.length) return { ok: false, reason: "No options selected" };

  // IP-level dedup
  const existing = await db.vote.findUnique({ where: { ip: ipHash } });
  if (existing) return { ok: false, reason: "already_voted" };

  const valid = await db.option.findMany({
    where: { id: { in: optionIds } },
    select: { id: true },
  });
  if (valid.length !== optionIds.length) {
    return { ok: false, reason: "Some options are invalid" };
  }

  await db.$transaction([
    db.option.updateMany({
      where: { id: { in: optionIds } },
      data: { votes: { increment: 1 } },
    }),
    db.vote.create({ data: { ip: ipHash, optionIds, optionCount: optionIds.length } }),
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
  emoji: string,
  votedOptionIds: string[] = []
): Promise<{
  option: { id: string; sectionId: string; name: string; emoji: string; isCustom: boolean; created: boolean };
  poll: PollResult;
}> {
  await ensureSeeded();

  const section = await db.section.findUnique({ where: { id: sectionId } });
  if (!section) throw new Error("Section not found");

  const name = rawName.trim().replace(/\s+/g, " ").slice(0, 60);
  if (!name) throw new Error("Option name is required");

  const existing = await db.option.findMany({
    where: { sectionId },
    select: { id: true, name: true, emoji: true, isCustom: true },
  });
  const match = existing.find((o) => o.name.toLowerCase() === name.toLowerCase());

  let option;
  if (match) {
    option = { id: match.id, sectionId, name: match.name, emoji: match.emoji, isCustom: match.isCustom, created: false };
  } else {
    let slug = `${toSlug(name)}-${randomSuffix()}`;
    const clash = await db.option.findUnique({ where: { slug } });
    if (clash) slug = `${toSlug(name)}-${randomSuffix(6)}`;

    const created = await db.option.create({
      data: {
        sectionId,
        slug,
        name,
        emoji: emoji || "✨",
        description: "Community-added option.",
        votes: 0,
        order: existing.length,
        isCustom: true,
      },
    });
    option = { id: created.id, sectionId, name: created.name, emoji: created.emoji, isCustom: true, created: true };
  }

  const poll = await computeResults(votedOptionIds);
  return { option, poll };
}

