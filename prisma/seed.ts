import { PrismaClient } from "@prisma/client";
import { SEED_SECTIONS } from "../src/lib/poll-data";

const db = new PrismaClient();

async function main() {
  console.log("Clearing existing data...");
  await db.vote.deleteMany();
  await db.option.deleteMany();
  await db.section.deleteMany();

  console.log("Seeding sections and options...");
  for (let i = 0; i < SEED_SECTIONS.length; i++) {
    const s = SEED_SECTIONS[i];
    const section = await db.section.create({
      data: {
        slug: s.slug,
        name: s.name,
        description: s.description,
        icon: s.icon,
        color: s.color,
        order: i,
      },
    });

    await db.option.createMany({
      data: s.options.map((opt, j) => ({
        sectionId: section.id,
        slug: opt.slug,
        name: opt.name,
        emoji: opt.emoji,
        description: opt.description,
        votes: 0,
        order: j,
      })),
    });

    console.log(`  ✓ ${s.name} (${s.options.length} options)`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
