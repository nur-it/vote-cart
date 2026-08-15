import type { SectionColor } from "./types";

// Seed definition for the voting platform.
// 10 sections x 10 options = 100 voting categories.
// `weight` controls the baseline vote count so initial percentages look alive.

export interface SeedOption {
  slug: string;
  name: string;
  emoji: string;
  imageUrl?: string;
  description: string;
  weight: number;
  name_en: string;
  name_ru: string;
  desc_en: string;
  desc_ru: string;
}

export interface SeedSection {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: SectionColor;
  name_en: string;
  name_ru: string;
  desc_en: string;
  desc_ru: string;
  options: SeedOption[];
}

export const SEED_SECTIONS: SeedSection[] = [
  {
    slug: "ecommerce-product",
    name: "Ecommerce Product",
    description: "Curated imported goods — Russian, Asian and specialty products.",
    name_en: "Ecommerce Product",
    name_ru: "Товары интернет-магазина",
    desc_en: "Curated imported goods — Russian, Asian and specialty products.",
    desc_ru: "Подборка импортных товаров — российские, азиатские и специализированные продукты.",
    icon: "ShoppingCart",
    color: "amber",
    options: [
      {
        slug: "russian-pickled-cucumbers",
        name: "Russian Style Pickled Cucumbers",
        emoji: "🥒",
        imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Crisp cucumbers pickled in classic Russian brine with dill and garlic.",
        name_en: "Russian Style Pickled Cucumbers",
        name_ru: "Огурцы маринованные по-русски",
        desc_en: "Crisp cucumbers pickled in classic Russian brine with dill and garlic.",
        desc_ru: "Хрустящие огурцы, маринованные в классическом русском рассоле с укропом и чесноком.",
        weight: 72,
      },
      {
        slug: "russian-imitation-caviar",
        name: "Russian Imitation Black & Red Caviar",
        emoji: "🫧",
        imageUrl: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Affordable imitation caviar with authentic Russian flavor.",
        name_en: "Russian Imitation Black & Red Caviar",
        name_ru: "Имитация чёрной и красной икры",
        desc_en: "Affordable imitation caviar with authentic Russian flavor.",
        desc_ru: "Доступная имитация икры с настоящим русским вкусом.",
        weight: 65,
      },
      {
        slug: "belarusian-condensed-milk",
        name: "Belarusian Sweetened Condensed Milk",
        emoji: "🥛",
        imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Rich and creamy condensed milk from Belarus, perfect for desserts.",
        name_en: "Belarusian Sweetened Condensed Milk",
        name_ru: "Белорусское сгущённое молоко",
        desc_en: "Rich and creamy condensed milk from Belarus, perfect for desserts.",
        desc_ru: "Густое и сливочное сгущённое молоко из Беларуси, идеально для десертов.",
        weight: 78,
      },
      {
        slug: "russian-instant-black-coffee",
        name: "Russian Instant Black Coffee",
        emoji: "☕",
        imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Bold and smooth instant black coffee, a Russian morning staple.",
        name_en: "Russian Instant Black Coffee",
        name_ru: "Русский растворимый чёрный кофе",
        desc_en: "Bold and smooth instant black coffee, a Russian morning staple.",
        desc_ru: "Крепкий и мягкий растворимый чёрный кофе — неотъемлемая часть русского утра.",
        weight: 70,
      },
      {
        slug: "russian-braised-beef",
        name: "Russian Braised Beef Canned Meat",
        emoji: "🥩",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Slow-braised beef in its own juices, ready to eat from the can.",
        name_en: "Russian Braised Beef Canned Meat",
        name_ru: "Тушёная говядина в консервной банке",
        desc_en: "Slow-braised beef in its own juices, ready to eat from the can.",
        desc_ru: "Говядина, тушённая в собственном соку — готова к употреблению прямо из банки.",
        weight: 60,
      },
      {
        slug: "russian-imported-pickled-cucumbers",
        name: "Russian Imported Pickled Cucumbers",
        emoji: "🫙",
        imageUrl: "https://images.unsplash.com/photo-1589135233689-d56d1f054707?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Imported whole pickled cucumbers with traditional Russian seasoning.",
        name_en: "Russian Imported Pickled Cucumbers",
        name_ru: "Импортные русские маринованные огурцы",
        desc_en: "Imported whole pickled cucumbers with traditional Russian seasoning.",
        desc_ru: "Импортные целые маринованные огурцы с традиционными русскими специями.",
        weight: 58,
      },
      {
        slug: "lubov-kopi-luwak-coffee",
        name: "LUBOV 3-in-1 Kopi Luwak Instant Coffee",
        emoji: "🍵",
        imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Premium Kopi Luwak blend with creamer and sugar in one sachet.",
        name_en: "LUBOV 3-in-1 Kopi Luwak Instant Coffee",
        name_ru: "LUBOV Копи Лювак 3-в-1 растворимый кофе",
        desc_en: "Premium Kopi Luwak blend with creamer and sugar in one sachet.",
        desc_ru: "Премиальный кофе Копи Лювак со сливками и сахаром в одном пакетике.",
        weight: 75,
      },
      {
        slug: "russian-smoked-herring",
        name: "Russian Smoked Herring Fillets",
        emoji: "🐟",
        imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Tender smoked herring fillets with a rich, savory flavor.",
        name_en: "Russian Smoked Herring Fillets",
        name_ru: "Копчёное филе сельди по-русски",
        desc_en: "Tender smoked herring fillets with a rich, savory flavor.",
        desc_ru: "Нежное копчёное филе сельди с насыщенным пикантным вкусом.",
        weight: 63,
      },
      {
        slug: "russian-imported-caviar",
        name: "Russian Imported Caviar",
        emoji: "🐠",
        imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Genuine imported caviar with a delicate, briny taste.",
        name_en: "Russian Imported Caviar",
        name_ru: "Импортная русская икра",
        desc_en: "Genuine imported caviar with a delicate, briny taste.",
        desc_ru: "Настоящая импортная икра с нежным солоноватым вкусом.",
        weight: 55,
      },
      {
        slug: "russian-linden-honey",
        name: "Russian Linden Honey",
        emoji: "🍯",
        imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Pure linden blossom honey harvested from Russian forests.",
        name_en: "Russian Linden Honey",
        name_ru: "Русский липовый мёд",
        desc_en: "Pure linden blossom honey harvested from Russian forests.",
        desc_ru: "Чистый липовый мёд, собранный в российских лесах.",
        weight: 80,
      },
      {
        slug: "russian-freeze-dried-coffee",
        name: "Russian Freeze-Dried Instant Coffee",
        emoji: "☕",
        imageUrl: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "High-quality freeze-dried coffee that preserves full aroma.",
        name_en: "Russian Freeze-Dried Instant Coffee",
        name_ru: "Русский сублимированный растворимый кофе",
        desc_en: "High-quality freeze-dried coffee that preserves full aroma.",
        desc_ru: "Высококачественный сублимированный кофе, сохраняющий полный аромат.",
        weight: 68,
      },
      {
        slug: "starbucks-uganda-coffee",
        name: "Starbucks Uganda Single-Origin Coffee Beans",
        emoji: "🫘",
        imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Single-origin Arabica beans from Uganda with bright, fruity notes.",
        name_en: "Starbucks Uganda Single-Origin Coffee Beans",
        name_ru: "Кофе Starbucks из Уганды односортовой обжарки",
        desc_en: "Single-origin Arabica beans from Uganda with bright, fruity notes.",
        desc_ru: "Односортовая арабика из Уганды с яркими фруктовыми нотками.",
        weight: 85,
      },
      {
        slug: "aged-puerh-tea-cake",
        name: "Aged Pu-erh Tea Cake",
        emoji: "🍵",
        imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Compressed aged Pu-erh tea with deep, earthy and smooth flavor.",
        name_en: "Aged Pu-erh Tea Cake",
        name_ru: "Прессованный выдержанный чай Пуэр",
        desc_en: "Compressed aged Pu-erh tea with deep, earthy and smooth flavor.",
        desc_ru: "Прессованный выдержанный чай пуэр с глубоким землистым и мягким вкусом.",
        weight: 62,
      },
      {
        slug: "roasted-salted-pistachios",
        name: "Roasted Salted Pistachios",
        emoji: "🌰",
        imageUrl: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Crunchy roasted pistachios lightly salted for a perfect snack.",
        name_en: "Roasted Salted Pistachios",
        name_ru: "Жареные солёные фисташки",
        desc_en: "Crunchy roasted pistachios lightly salted for a perfect snack.",
        desc_ru: "Хрустящие жареные фисташки, слегка подсоленные — идеальная закуска.",
        weight: 88,
      },
      {
        slug: "japanese-throat-spray",
        name: "Japanese Throat Spray",
        emoji: "💊",
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Soothing Japanese throat spray for fast relief and freshness.",
        name_en: "Japanese Throat Spray",
        name_ru: "Японский спрей для горла",
        desc_en: "Soothing Japanese throat spray for fast relief and freshness.",
        desc_ru: "Успокаивающий японский спрей для горла для быстрого облегчения и свежести.",
        weight: 50,
      },
      {
        slug: "tangerine-peel-puerh-tea",
        name: "Tangerine Peel Pu-erh Tea",
        emoji: "🍊",
        imageUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Aged Pu-erh tea blended with dried tangerine peel for citrus depth.",
        name_en: "Tangerine Peel Pu-erh Tea",
        name_ru: "Чай Пуэр с мандариновой цедрой",
        desc_en: "Aged Pu-erh tea blended with dried tangerine peel for citrus depth.",
        desc_ru: "Выдержанный пуэр с сушёной мандариновой цедрой для цитрусовой глубины.",
        weight: 59,
      },
      {
        slug: "anxi-tieguanyin-oolong",
        name: "Anxi Tieguanyin Oolong Tea",
        emoji: "🍃",
        imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Premium Tieguanyin oolong from Anxi with floral and creamy notes.",
        name_en: "Anxi Tieguanyin Oolong Tea",
        name_ru: "Улун Тегуаньинь из Аньси",
        desc_en: "Premium Tieguanyin oolong from Anxi with floral and creamy notes.",
        desc_ru: "Премиальный улун Тегуаньинь из Аньси с цветочными и сливочными нотками.",
        weight: 66,
      },
      {
        slug: "russian-chocolate-truffles",
        name: "Russian Almond-Filled Dark Chocolate Truffles",
        emoji: "🍫",
        imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80&fm=webp",
        description: "Indulgent dark chocolate truffles with a whole roasted almond inside.",
        name_en: "Russian Almond-Filled Dark Chocolate Truffles",
        name_ru: "Русские трюфели из тёмного шоколада с миндалём",
        desc_en: "Indulgent dark chocolate truffles with a whole roasted almond inside.",
        desc_ru: "Изысканные трюфели из тёмного шоколада с целым жареным миндалём внутри.",
        weight: 82,
      },
    ],
  },
];
