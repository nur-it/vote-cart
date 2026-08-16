import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";
import { SEED_SECTIONS } from "../src/lib/poll-data";

config({ path: ".env" });

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "" }),
});

async function main() {
  console.log("Updating option image URLs to local /categories/ paths...");
  let count = 0;
  for (const section of SEED_SECTIONS) {
    for (const opt of section.options) {
      if (opt.imageUrl) {
        const updated = await db.option.updateMany({
          where: { slug: opt.slug },
          data: { imageUrl: opt.imageUrl },
        });
        count += updated.count;
        console.log(`  ✓ ${opt.name} -> ${opt.imageUrl} (${updated.count} rows updated)`);
      }
    }
  }
  console.log(`Done! Total ${count} options updated.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
