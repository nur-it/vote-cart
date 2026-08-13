import type { SectionColor } from "./types";

// Seed definition for the voting platform.
// 10 sections x 10 options = 100 voting categories.
// `weight` controls the baseline vote count so initial percentages look alive.

export interface SeedOption {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  weight: number; // baseline popularity (0-100)
}

export interface SeedSection {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  color: SectionColor;
  options: SeedOption[];
}

export const SEED_SECTIONS: SeedSection[] = [
  {
    slug: "ecommerce-product",
    name: "Ecommerce Product",
    description: "Curated imported goods — Russian, Asian and specialty products.",
    icon: "ShoppingCart",
    color: "amber",
    options: [
      { slug: "russian-pickled-cucumbers", name: "Russian Style Pickled Cucumbers", emoji: "🥒", description: "Crisp cucumbers pickled in classic Russian brine with dill and garlic.", weight: 72 },
      { slug: "russian-imitation-caviar", name: "Russian Imitation Black & Red Caviar", emoji: "🫧", description: "Affordable imitation caviar with authentic Russian flavor.", weight: 65 },
      { slug: "belarusian-condensed-milk", name: "Belarusian Sweetened Condensed Milk", emoji: "🥛", description: "Rich and creamy condensed milk from Belarus, perfect for desserts.", weight: 78 },
      { slug: "russian-instant-black-coffee", name: "Russian Instant Black Coffee", emoji: "☕", description: "Bold and smooth instant black coffee, a Russian morning staple.", weight: 70 },
      { slug: "russian-braised-beef", name: "Russian Braised Beef Canned Meat", emoji: "🥩", description: "Slow-braised beef in its own juices, ready to eat from the can.", weight: 60 },
      { slug: "russian-imported-pickled-cucumbers", name: "Russian Imported Pickled Cucumbers", emoji: "🫙", description: "Imported whole pickled cucumbers with traditional Russian seasoning.", weight: 58 },
      { slug: "lubov-kopi-luwak-coffee", name: "LUBOV 3-in-1 Kopi Luwak Instant Coffee", emoji: "🍵", description: "Premium Kopi Luwak blend with creamer and sugar in one sachet.", weight: 75 },
      { slug: "russian-smoked-herring", name: "Russian Smoked Herring Fillets", emoji: "🐟", description: "Tender smoked herring fillets with a rich, savory flavor.", weight: 63 },
      { slug: "russian-imported-caviar", name: "Russian Imported Caviar", emoji: "🐠", description: "Genuine imported caviar with a delicate, briny taste.", weight: 55 },
      { slug: "russian-linden-honey", name: "Russian Linden Honey", emoji: "🍯", description: "Pure linden blossom honey harvested from Russian forests.", weight: 80 },
      { slug: "russian-freeze-dried-coffee", name: "Russian Freeze-Dried Instant Coffee", emoji: "☕", description: "High-quality freeze-dried coffee that preserves full aroma.", weight: 68 },
      { slug: "starbucks-uganda-coffee", name: "Starbucks Uganda Single-Origin Coffee Beans", emoji: "🫘", description: "Single-origin Arabica beans from Uganda with bright, fruity notes.", weight: 85 },
      { slug: "aged-puerh-tea-cake", name: "Aged Pu-erh Tea Cake", emoji: "🍵", description: "Compressed aged Pu-erh tea with deep, earthy and smooth flavor.", weight: 62 },
      { slug: "roasted-salted-pistachios", name: "Roasted Salted Pistachios", emoji: "🌰", description: "Crunchy roasted pistachios lightly salted for a perfect snack.", weight: 88 },
      { slug: "japanese-throat-spray", name: "Japanese Throat Spray", emoji: "💊", description: "Soothing Japanese throat spray for fast relief and freshness.", weight: 50 },
      { slug: "tangerine-peel-puerh-tea", name: "Tangerine Peel Pu-erh Tea", emoji: "🍊", description: "Aged Pu-erh tea blended with dried tangerine peel for citrus depth.", weight: 59 },
      { slug: "anxi-tieguanyin-oolong", name: "Anxi Tieguanyin Oolong Tea", emoji: "🍃", description: "Premium Tieguanyin oolong from Anxi with floral and creamy notes.", weight: 66 },
      { slug: "russian-chocolate-truffles", name: "Russian Almond-Filled Dark Chocolate Truffles", emoji: "🍫", description: "Indulgent dark chocolate truffles with a whole roasted almond inside.", weight: 82 },
    ],
  },
];

// Scale a 0-100 weight into a realistic baseline vote count.
// Kept moderate so each user vote + "simulate" batch produces a visible
// shift in the live percentages (section totals land around 600-900).
export function weightToVotes(weight: number): number {
  return Math.round(weight * 1.2 + (weight % 6));
}
