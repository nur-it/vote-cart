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
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-13 max-w-6xl items-center justify-between px-3.5 sm:h-16 sm:px-4">
        <div className="flex items-center gap-2.5">
          <div className="relative flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs sm:size-9">
            <Vote className="size-4.5 sm:size-5" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight sm:text-lg">
                VoteCart
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="live-dot inline-block size-1.5 rounded-full bg-emerald-500" />
                LIVE
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
