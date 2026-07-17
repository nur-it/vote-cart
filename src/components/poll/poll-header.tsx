"use client";

import { Vote } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface PollHeaderProps {
  voterCount: number;
  totalVotes: number;
}

function compact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

export function PollHeader({ voterCount, totalVotes }: PollHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:h-16">
        <div className="flex items-center gap-2.5">
          <div className="relative flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Vote className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight">
                VoteCart
              </span>
              <span className="hidden items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 sm:inline-flex">
                <span className="live-dot inline-block size-1.5 rounded-full bg-emerald-500" />
                LIVE
              </span>
            </div>
            <span className="hidden text-[11px] text-muted-foreground sm:block">
              Category popularity poll
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-3 text-right sm:flex">
            <div className="leading-tight">
              <div className="text-sm font-bold tabular-nums">
                {compact(voterCount)}
              </div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Voters
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="leading-tight">
              <div className="text-sm font-bold tabular-nums">
                {compact(totalVotes)}
              </div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Votes
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
