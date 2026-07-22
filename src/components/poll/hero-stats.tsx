"use client";

import type { PollResult } from "@/lib/types";
import { BarChart3, Crown, Tag, Users } from "lucide-react";

interface HeroStatsProps {
  data: PollResult;
  hasVoted: boolean;
}

function compact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

export function HeroHeader({ hasVoted }: { hasVoted: boolean }) {
  if (hasVoted) return null;

  return (
    <div className="py-1">
      <h1 className="text-2xl font-extrabold tracking-tight leading-tight sm:text-4xl">
        Which shopping categories do you{" "}
        <span className="bg-linear-to-r from-rose-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
          love most?
        </span>
      </h1>
    </div>
  );
}

export function HeroStats({ data }: HeroStatsProps) {
  return (
    <div className="mt-6 rounded-xl border bg-card/60 px-3 py-2.5 text-xs text-muted-foreground backdrop-blur-xs sm:mt-8 sm:px-4 sm:py-3">
      <div className="flex flex-wrap items-center justify-between gap-2.5 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-6">
          <div className="flex items-center gap-1.5">
            <Users className="size-3.5 text-rose-500" />
            <span className="font-semibold text-foreground">
              {compact(data.voterCount)}
            </span>{" "}
            Voters
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart3 className="size-3.5 text-fuchsia-500" />
            <span className="font-semibold text-foreground">
              {compact(data.totalVotes)}
            </span>{" "}
            Total Votes
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="size-3.5 text-violet-500" />
            <span className="font-semibold text-foreground">
              {data.optionCount}
            </span>{" "}
            Categories
          </div>
        </div>

        {data.topOption && (
          <div className="flex items-center justify-center gap-1.5 font-medium sm:justify-end">
            <Crown className="size-3.5 text-amber-500" />
            <span>Top pick:</span>
            <span className="font-bold text-foreground">
              {data.topOption.emoji} {data.topOption.name}
            </span>
            <span className="text-[11px] opacity-80">
              ({data.topOption.percentage.toFixed(1)}%)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

