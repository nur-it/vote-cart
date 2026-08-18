"use client";

import type { PollResult } from "@/lib/types";
import { BarChart3, Crown, Sparkles, Tag, Users } from "lucide-react";
import { useLang } from "@/lib/i18n";

interface HeroStatsProps {
  data: PollResult;
  hasVoted?: boolean;
}

function compact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

export function HeroHeader({ hasVoted }: { hasVoted?: boolean }) {
  const { t } = useLang();
  return (
    <div className="py-1">
      <h1 className="text-2xl font-extrabold tracking-tight leading-tight sm:text-3xl lg:text-4xl">
        {hasVoted ? t.heroHeadingPeople : t.heroHeadingYou}{" "}
        <span className="bg-linear-to-r from-rose-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
          {t.heroHeadingEnd}
        </span>
      </h1>
    </div>
  );
}

export function HeroStats({ data }: HeroStatsProps) {
  const { t } = useLang();
  const topOption = data.topOption;

  return (
    <div className="mt-4 rounded-xl border bg-card/60 px-3 py-2 text-xs text-muted-foreground backdrop-blur-xs sm:mt-6 sm:rounded-full sm:px-4 sm:py-2">
      {/* Desktop: One continuous sleek row */}
      {/* Mobile: Compact 2-line mini layout */}
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* Metric counts */}
        <div className="flex items-center justify-center gap-2 sm:justify-start sm:gap-3.5">
          <div className="flex items-center gap-1">
            <Users className="size-3.5 text-muted-foreground" />
            <span className="font-semibold text-foreground">{compact(data.voterCount)}</span>
            <span className="text-[11px] sm:text-xs">{t.voters}</span>
          </div>

          <span className="text-border">·</span>

          <div className="flex items-center gap-1">
            <BarChart3 className="size-3.5 text-muted-foreground" />
            <span className="font-semibold text-foreground">{compact(data.totalVotes)}</span>
            <span className="text-[11px] sm:text-xs">{t.totalVotes}</span>
          </div>

          <span className="text-border">·</span>

          <div className="flex items-center gap-1">
            <Tag className="size-3.5 text-muted-foreground" />
            <span className="font-semibold text-foreground">{data.optionCount}</span>
            <span className="text-[11px] sm:text-xs">{t.categories}</span>
          </div>
        </div>

        {/* Top Pick Highlight */}
        {topOption && (
          <div className="flex items-center justify-center gap-1.5 border-t border-border/50 pt-1.5 text-[11px] sm:border-t-0 sm:pt-0 sm:text-xs sm:justify-end min-w-0">
            <Crown className="size-3.5 shrink-0 text-amber-500" />
            <span className="shrink-0 text-muted-foreground">{t.topPick}:</span>
            <span className="truncate font-semibold text-foreground">
              {topOption.emoji} {topOption.name}
            </span>
            <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.2 font-mono text-[10px] font-semibold text-foreground/80">
              {topOption.percentage.toFixed(1)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
