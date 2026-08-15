// Core domain types for the Ecommerce Category Voting Platform

export type SectionColor =
  | "rose"
  | "amber"
  | "emerald"
  | "violet"
  | "orange"
  | "fuchsia"
  | "lime"
  | "pink"
  | "red"
  | "teal";

// Static color class map (Tailwind v4 JIT requires full literal class names)
export const SECTION_COLORS: Record<
  SectionColor,
  {
    bar: string;
    barSoft: string;
    text: string;
    textSoft: string;
    ring: string;
    border: string;
    bg: string;
    glow: string;
    gradFrom: string;
    gradTo: string;
  }
> = {
  rose: {
    bar: "bg-rose-500",
    barSoft: "bg-rose-500/15",
    text: "text-rose-600 dark:text-rose-400",
    textSoft: "text-rose-600/80 dark:text-rose-400/80",
    ring: "ring-rose-500/30",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    glow: "shadow-rose-500/20",
    gradFrom: "from-rose-500",
    gradTo: "to-rose-400",
  },
  amber: {
    bar: "bg-amber-500",
    barSoft: "bg-amber-500/15",
    text: "text-amber-600 dark:text-amber-400",
    textSoft: "text-amber-600/80 dark:text-amber-400/80",
    ring: "ring-amber-500/30",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    glow: "shadow-amber-500/20",
    gradFrom: "from-amber-500",
    gradTo: "to-amber-400",
  },
  emerald: {
    bar: "bg-emerald-500",
    barSoft: "bg-emerald-500/15",
    text: "text-emerald-600 dark:text-emerald-400",
    textSoft: "text-emerald-600/80 dark:text-emerald-400/80",
    ring: "ring-emerald-500/30",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    glow: "shadow-emerald-500/20",
    gradFrom: "from-emerald-500",
    gradTo: "to-emerald-400",
  },
  violet: {
    bar: "bg-violet-500",
    barSoft: "bg-violet-500/15",
    text: "text-violet-600 dark:text-violet-400",
    textSoft: "text-violet-600/80 dark:text-violet-400/80",
    ring: "ring-violet-500/30",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    glow: "shadow-violet-500/20",
    gradFrom: "from-violet-500",
    gradTo: "to-violet-400",
  },
  orange: {
    bar: "bg-orange-500",
    barSoft: "bg-orange-500/15",
    text: "text-orange-600 dark:text-orange-400",
    textSoft: "text-orange-600/80 dark:text-orange-400/80",
    ring: "ring-orange-500/30",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    glow: "shadow-orange-500/20",
    gradFrom: "from-orange-500",
    gradTo: "to-orange-400",
  },
  fuchsia: {
    bar: "bg-fuchsia-500",
    barSoft: "bg-fuchsia-500/15",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    textSoft: "text-fuchsia-600/80 dark:text-fuchsia-400/80",
    ring: "ring-fuchsia-500/30",
    border: "border-fuchsia-500/30",
    bg: "bg-fuchsia-500/10",
    glow: "shadow-fuchsia-500/20",
    gradFrom: "from-fuchsia-500",
    gradTo: "to-fuchsia-400",
  },
  lime: {
    bar: "bg-lime-500",
    barSoft: "bg-lime-500/15",
    text: "text-lime-600 dark:text-lime-400",
    textSoft: "text-lime-600/80 dark:text-lime-400/80",
    ring: "ring-lime-500/30",
    border: "border-lime-500/30",
    bg: "bg-lime-500/10",
    glow: "shadow-lime-500/20",
    gradFrom: "from-lime-500",
    gradTo: "to-lime-400",
  },
  pink: {
    bar: "bg-pink-500",
    barSoft: "bg-pink-500/15",
    text: "text-pink-600 dark:text-pink-400",
    textSoft: "text-pink-600/80 dark:text-pink-400/80",
    ring: "ring-pink-500/30",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
    glow: "shadow-pink-500/20",
    gradFrom: "from-pink-500",
    gradTo: "to-pink-400",
  },
  red: {
    bar: "bg-red-500",
    barSoft: "bg-red-500/15",
    text: "text-red-600 dark:text-red-400",
    textSoft: "text-red-600/80 dark:text-red-400/80",
    ring: "ring-red-500/30",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    glow: "shadow-red-500/20",
    gradFrom: "from-red-500",
    gradTo: "to-red-400",
  },
  teal: {
    bar: "bg-teal-500",
    barSoft: "bg-teal-500/15",
    text: "text-teal-600 dark:text-teal-400",
    textSoft: "text-teal-600/80 dark:text-teal-400/80",
    ring: "ring-teal-500/30",
    border: "border-teal-500/30",
    bg: "bg-teal-500/10",
    glow: "shadow-teal-500/20",
    gradFrom: "from-teal-500",
    gradTo: "to-teal-400",
  },
};

export interface OptionResult {
  id: string;
  sectionId: string;
  slug: string;
  name: string;
  emoji: string;
  imageUrl?: string | null;
  description: string;
  votes: number;
  percentage: number; // 0-100, 1 decimal place — share of this section's votes
  rank: number; // 1-based rank within its section
  isLeading: boolean; // top of its section
  isCustom: boolean; // true = added by a voter (not in the seeded list)
}

export interface SectionResult {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  color: SectionColor;
  order: number;
  options: OptionResult[];
  totalVotes: number; // sum of option votes in this section
  leadingOptionName: string | null;
  leadingOptionPercentage: number | null; // leading option's share of this section
}

export interface PollResult {
  sections: SectionResult[];
  totalVotes: number; // sum of every option's votes across all sections
  voterCount: number; // distinct vote submissions
  optionCount: number; // total options available
  hasVoted: boolean; // did this client already cast a vote
  votedOptionIds: string[]; // options this client picked
  votedAt?: number; // ms timestamp of vote (for undo window)
  topOption: {
    name: string;
    emoji: string;
    percentage: number;
    sectionName: string;
  } | null;
}

export interface VotePayload {
  optionIds: string[];
  name: string;
  email: string;
  phone?: string;
}

export interface SimulatePayload {
  count?: number;
}

export interface AddOptionPayload {
  sectionId: string;
  name: string;
  emoji?: string;
  imageUrl?: string;
}

// Returned by the "add custom option" endpoint.
export interface AddOptionResponse {
  option: {
    id: string;
    sectionId: string;
    name: string;
    emoji: string;
    imageUrl?: string | null;
    isCustom: boolean;
    created: boolean; // false if an existing matching option was returned
  };
  poll: PollResult;
}
