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
    slug: "apparel-fashion",
    name: "Apparel & Fashion",
    description: "Clothing, footwear and accessories for every wardrobe.",
    icon: "Shirt",
    color: "rose",
    options: [
      { slug: "mens-apparel", name: "Men's Apparel", emoji: "👔", description: "Shirts, trousers, suits and everyday menswear.", weight: 78 },
      { slug: "womens-apparel", name: "Women's Apparel", emoji: "👗", description: "Dresses, tops, jeans and curated womenswear.", weight: 92 },
      { slug: "kids-clothing", name: "Kids' Clothing", emoji: "🧒", description: "Playful, durable outfits for growing kids.", weight: 64 },
      { slug: "footwear", name: "Footwear", emoji: "👟", description: "Sneakers, heels, boots and comfy everyday shoes.", weight: 85 },
      { slug: "activewear", name: "Activewear", emoji: "🏋️", description: "Performance gear for gym, run and yoga.", weight: 71 },
      { slug: "loungewear", name: "Underwear & Loungewear", emoji: "🩱", description: "Soft basics for rest and recovery.", weight: 48 },
      { slug: "bags-handbags", name: "Bags & Handbags", emoji: "👜", description: "Totes, backpacks and statement handbags.", weight: 66 },
      { slug: "watches", name: "Watches", emoji: "⌚", description: "Smart and analog timepieces for any wrist.", weight: 54 },
      { slug: "jewelry", name: "Jewelry", emoji: "💍", description: "Rings, necklaces and fine accessories.", weight: 59 },
      { slug: "eyewear", name: "Eyewear", emoji: "🕶️", description: "Prescription frames and sunny-day shades.", weight: 41 },
    ],
  },
  {
    slug: "food-grocery",
    name: "Food & Grocery",
    description: "Fresh, pantry and everyday essentials delivered fast.",
    icon: "Apple",
    color: "amber",
    options: [
      { slug: "fresh-produce", name: "Fresh Produce", emoji: "🥬", description: "Farm-fresh fruits and vegetables.", weight: 88 },
      { slug: "dairy-eggs", name: "Dairy & Eggs", emoji: "🥛", description: "Milk, cheese, yogurt and farm eggs.", weight: 76 },
      { slug: "snacks", name: "Snacks", emoji: "🍿", description: "Chips, cookies and crave-worthy treats.", weight: 81 },
      { slug: "beverages", name: "Beverages", emoji: "🧃", description: "Juices, sodas, water and specialty drinks.", weight: 73 },
      { slug: "frozen-foods", name: "Frozen Foods", emoji: "🧊", description: "Ready meals and frozen staples.", weight: 52 },
      { slug: "bakery", name: "Bakery", emoji: "🥐", description: "Bread, pastries and morning favorites.", weight: 67 },
      { slug: "meat-seafood", name: "Meat & Seafood", emoji: "🦐", description: "Cuts, fillets and fresh-caught seafood.", weight: 61 },
      { slug: "coffee-tea", name: "Coffee & Tea", emoji: "☕", description: "Beans, grounds, leaves and pods.", weight: 84 },
      { slug: "pantry-staples", name: "Pantry Staples", emoji: "🫙", description: "Grains, oils, spices and canned goods.", weight: 58 },
      { slug: "organic-natural", name: "Organic & Natural", emoji: "🌾", description: "Certified organic and clean-label picks.", weight: 49 },
    ],
  },
  {
    slug: "electronics",
    name: "Electronics",
    description: "The latest gadgets, devices and smart gear.",
    icon: "Laptop",
    color: "violet",
    options: [
      { slug: "smartphones", name: "Smartphones", emoji: "📱", description: "Flagship and value phones for every budget.", weight: 95 },
      { slug: "laptops", name: "Laptops", emoji: "💻", description: "Ultraportables, gaming rigs and workhorses.", weight: 82 },
      { slug: "audio-headphones", name: "Audio & Headphones", emoji: "🎧", description: "Earbuds, over-ears and speakers.", weight: 86 },
      { slug: "tvs", name: "TVs", emoji: "📺", description: "4K and OLED screens for home cinema.", weight: 63 },
      { slug: "cameras", name: "Cameras", emoji: "📷", description: "Mirrorless, DSLR and instant cameras.", weight: 47 },
      { slug: "gaming-consoles", name: "Gaming Consoles", emoji: "🎮", description: "Consoles, controllers and game bundles.", weight: 79 },
      { slug: "smart-home", name: "Smart Home", emoji: "🏠", description: "Hubs, lights, locks and security cams.", weight: 56 },
      { slug: "wearables", name: "Wearables", emoji: "⌚", description: "Fitness bands and smartwatches.", weight: 62 },
      { slug: "computer-accessories", name: "Computer Accessories", emoji: "🖱️", description: "Mice, keyboards, docks and storage.", weight: 51 },
      { slug: "tablets", name: "Tablets", emoji: "📲", description: "Reading, drawing and on-the-go tablets.", weight: 44 },
    ],
  },
  {
    slug: "home-kitchen",
    name: "Home & Kitchen",
    description: "Everything to cook, host and organize your space.",
    icon: "Sofa",
    color: "emerald",
    options: [
      { slug: "cookware", name: "Cookware", emoji: "🍳", description: "Pots, pans and precision kitchen tools.", weight: 72 },
      { slug: "furniture", name: "Furniture", emoji: "🛋️", description: "Sofas, tables, beds and storage pieces.", weight: 68 },
      { slug: "bedding", name: "Bedding", emoji: "🛏️", description: "Sheets, pillows and cozy comforters.", weight: 55 },
      { slug: "small-appliances", name: "Small Appliances", emoji: "🍳", description: "Blenders, toasters and coffee makers.", weight: 64 },
      { slug: "storage-organization", name: "Storage & Organization", emoji: "📦", description: "Bins, racks and clutter-busting helpers.", weight: 43 },
      { slug: "lighting", name: "Lighting", emoji: "💡", description: "Lamps, bulbs and ambient fixtures.", weight: 46 },
      { slug: "decor", name: "Decor", emoji: "🖼️", description: "Wall art, rugs and finishing touches.", weight: 50 },
      { slug: "gardening-tools", name: "Gardening Tools", emoji: "🪴", description: "Planters, pruners and grow essentials.", weight: 38 },
      { slug: "dinnerware", name: "Dinnerware", emoji: "🍽️", description: "Plates, glasses and table settings.", weight: 41 },
      { slug: "cleaning-supplies", name: "Cleaning Supplies", emoji: "🧽", description: "Detergents, tools and eco refills.", weight: 47 },
    ],
  },
  {
    slug: "beauty-health",
    name: "Beauty & Health",
    description: "Skincare, wellness and personal care must-haves.",
    icon: "Sparkles",
    color: "pink",
    options: [
      { slug: "skincare", name: "Skincare", emoji: "🧴", description: "Cleansers, serums and daily moisturizers.", weight: 89 },
      { slug: "makeup", name: "Makeup", emoji: "💄", description: "Foundation, lips, eyes and color palettes.", weight: 80 },
      { slug: "hair-care", name: "Hair Care", emoji: "💇", description: "Shampoo, treatments and styling tools.", weight: 70 },
      { slug: "fragrance", name: "Fragrance", emoji: "🌸", description: "Perfumes, colognes and body mists.", weight: 58 },
      { slug: "vitamins-supplements", name: "Vitamins & Supplements", emoji: "💊", description: "Daily support for wellness goals.", weight: 61 },
      { slug: "personal-care", name: "Personal Care", emoji: "🧼", description: "Body, oral and grooming essentials.", weight: 53 },
      { slug: "oral-care", name: "Oral Care", emoji: "🪥", description: "Toothbrushes, paste and whitening.", weight: 39 },
      { slug: "mens-grooming", name: "Men's Grooming", emoji: "🪒", description: "Shave, beard and skincare for men.", weight: 44 },
      { slug: "wellness-devices", name: "Wellness Devices", emoji: "🩺", description: "Massagers, monitors and at-home tech.", weight: 36 },
      { slug: "baby-care", name: "Baby Care", emoji: "🍼", description: "Gentle products for the littlest ones.", weight: 48 },
    ],
  },
  {
    slug: "toys-games",
    name: "Toys & Games",
    description: "Playtime favorites for kids and the young at heart.",
    icon: "Gamepad2",
    color: "orange",
    options: [
      { slug: "action-figures", name: "Action Figures", emoji: "🦸", description: "Heroes, villains and collectible figures.", weight: 45 },
      { slug: "board-games", name: "Board Games", emoji: "🎲", description: "Family nights and strategy classics.", weight: 62 },
      { slug: "building-sets", name: "Building Sets", emoji: "🧱", description: "Bricks and creative construction kits.", weight: 70 },
      { slug: "dolls", name: "Dolls", emoji: "🪆", description: "Dolls, accessories and playsets.", weight: 41 },
      { slug: "outdoor-toys", name: "Outdoor Toys", emoji: "🪁", description: "Bikes, balls and backyard fun.", weight: 52 },
      { slug: "puzzles", name: "Puzzles", emoji: "🧩", description: "Jigsaws and brain teasers.", weight: 47 },
      { slug: "video-games", name: "Video Games", emoji: "🎮", description: "Latest titles across all platforms.", weight: 78 },
      { slug: "educational-toys", name: "Educational Toys", emoji: "🔬", description: "STEM kits and learning play.", weight: 55 },
      { slug: "card-games", name: "Card Games", emoji: "🃏", description: "Decks, TCGs and quick party games.", weight: 49 },
      { slug: "plush-toys", name: "Plush Toys", emoji: "🧸", description: "Soft, huggable companions.", weight: 43 },
    ],
  },
  {
    slug: "sports-outdoors",
    name: "Sports & Outdoors",
    description: "Gear up for fitness, trail and adventure.",
    icon: "Dumbbell",
    color: "teal",
    options: [
      { slug: "fitness-equipment", name: "Fitness Equipment", emoji: "🏋️", description: "Weights, benches and home gym gear.", weight: 66 },
      { slug: "cycling", name: "Cycling", emoji: "🚴", description: "Bikes, helmets and riding accessories.", weight: 58 },
      { slug: "camping-gear", name: "Camping Gear", emoji: "⛺", description: "Tents, sleeping bags and camp essentials.", weight: 54 },
      { slug: "running-gear", name: "Running Gear", emoji: "🏃", description: "Shoes, apparel and run tech.", weight: 61 },
      { slug: "yoga", name: "Yoga", emoji: "🧘", description: "Mats, blocks and mindful accessories.", weight: 49 },
      { slug: "team-sports", name: "Team Sports", emoji: "⚽", description: "Soccer, basketball and league gear.", weight: 45 },
      { slug: "water-sports", name: "Water Sports", emoji: "🏄", description: "Swim, surf and paddle equipment.", weight: 38 },
      { slug: "winter-sports", name: "Winter Sports", emoji: "⛷️", description: "Ski, snowboard and cold-weather gear.", weight: 35 },
      { slug: "outdoor-apparel", name: "Outdoor Apparel", emoji: "🧥", description: "Layered, weather-ready clothing.", weight: 51 },
      { slug: "fishing", name: "Fishing", emoji: "🎣", description: "Rods, reels and tackle for anglers.", weight: 33 },
    ],
  },
  {
    slug: "books-media",
    name: "Books & Media",
    description: "Stories, knowledge and entertainment for every shelf.",
    icon: "BookOpen",
    color: "violet",
    options: [
      { slug: "fiction", name: "Fiction", emoji: "📖", description: "Novels, thrillers and literary favorites.", weight: 72 },
      { slug: "non-fiction", name: "Non-Fiction", emoji: "📚", description: "Biography, history and how-to.", weight: 60 },
      { slug: "childrens-books", name: "Children's Books", emoji: "🧸", description: "Picture books and early readers.", weight: 53 },
      { slug: "textbooks", name: "Textbooks", emoji: "📒", description: "Academic and reference editions.", weight: 41 },
      { slug: "comics-manga", name: "Comics & Manga", emoji: "💢", description: "Graphic novels and serialized hits.", weight: 64 },
      { slug: "audiobooks", name: "Audiobooks", emoji: "🎧", description: "Listened stories on the go.", weight: 57 },
      { slug: "movies", name: "Movies", emoji: "🎬", description: "Blu-rays and digital collections.", weight: 55 },
      { slug: "music", name: "Music", emoji: "🎵", description: "Vinyl, CDs and albums.", weight: 46 },
      { slug: "stationery", name: "Stationery", emoji: "✏️", description: "Notebooks, pens and desk joy.", weight: 48 },
      { slug: "magazines", name: "Magazines", emoji: "📰", description: "Subscriptions and single issues.", weight: 32 },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    description: "Parts, accessories and gear for every ride.",
    icon: "Car",
    color: "red",
    options: [
      { slug: "car-electronics", name: "Car Electronics", emoji: "📟", description: "Dash cams, stereos and chargers.", weight: 52 },
      { slug: "tires-wheels", name: "Tires & Wheels", emoji: "🛞", description: "All-season and performance rubber.", weight: 49 },
      { slug: "tools", name: "Tools", emoji: "🔧", description: "Hand and power tools for the garage.", weight: 56 },
      { slug: "exterior-accessories", name: "Exterior Accessories", emoji: "🚗", description: "Covers, racks and trim upgrades.", weight: 40 },
      { slug: "interior-accessories", name: "Interior Accessories", emoji: "🪑", description: "Mats, seats and cabin comfort.", weight: 44 },
      { slug: "oils-fluids", name: "Oils & Fluids", emoji: "🛢️", description: "Engine oil and maintenance fluids.", weight: 38 },
      { slug: "motorcycle", name: "Motorcycle", emoji: "🏍️", description: "Riding gear and bike parts.", weight: 42 },
      { slug: "car-care", name: "Car Care", emoji: "🧼", description: "Wash, wax and detailing supplies.", weight: 46 },
      { slug: "replacement-parts", name: "Replacement Parts", emoji: "⚙️", description: "Filters, brakes and OEM parts.", weight: 37 },
      { slug: "garage", name: "Garage", emoji: "🏚️", description: "Storage, jacks and shop equipment.", weight: 31 },
    ],
  },
  {
    slug: "baby-pets",
    name: "Baby & Pets",
    description: "Loving essentials for little ones and furry friends.",
    icon: "PawPrint",
    color: "lime",
    options: [
      { slug: "diapers", name: "Diapers", emoji: "👶", description: "Reliable diapers and changing care.", weight: 57 },
      { slug: "baby-gear", name: "Baby Gear", emoji: "🚼", description: "Strollers, carriers and high chairs.", weight: 48 },
      { slug: "pet-food", name: "Pet Food", emoji: "🐾", description: "Nutrition for dogs, cats and more.", weight: 69 },
      { slug: "pet-toys", name: "Pet Toys", emoji: "🦴", description: "Chew, fetch and enrichment toys.", weight: 51 },
      { slug: "cat-supplies", name: "Cat Supplies", emoji: "🐈", description: "Litter, trees and feline favorites.", weight: 54 },
      { slug: "dog-supplies", name: "Dog Supplies", emoji: "🐕", description: "Leashes, beds and training gear.", weight: 60 },
      { slug: "aquarium", name: "Aquarium", emoji: "🐠", description: "Tanks, filters and aquatic decor.", weight: 35 },
      { slug: "pet-health", name: "Pet Health", emoji: "🩺", description: "Supplements and grooming care.", weight: 40 },
      { slug: "strollers", name: "Strollers", emoji: "🛒", description: "Smooth rides for baby on the go.", weight: 33 },
      { slug: "feeding", name: "Feeding", emoji: "🍼", description: "Bottles, bibs and nursing essentials.", weight: 44 },
    ],
  },
];

// Scale a 0-100 weight into a realistic baseline vote count.
// Kept moderate so each user vote + "simulate" batch produces a visible
// shift in the live percentages (section totals land around 600-900).
export function weightToVotes(weight: number): number {
  return Math.round(weight * 1.2 + (weight % 6));
}
