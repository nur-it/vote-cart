"use client";

import { motion } from "framer-motion";
import { BarChart3, Crown, Tag, Users } from "lucide-react";
import type { PollResult } from "@/lib/types";

interface HeroStatsProps {
  data: PollResult;
  hasVoted: boolean;
}

function compact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

export function HeroStats({ data, hasVoted }: HeroStatsProps) {
  const stats = [
    {
      icon: Users,
      label: "Voters",
      value: compact(data.voterCount),
      hint: "distinct submissions",
    },
    {
      icon: BarChart3,
      label: "Votes cast",
      value: compact(data.totalVotes),
      hint: "across all categories",
    },
    {
      icon: Tag,
      label: "Categories",
      value: String(data.optionCount),
      hint: "options to choose from",
    },
  ];

  return (
    <section className="space-y-4">
      {!hasVoted && (
        <div className="space-y-2 text-center sm:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold tracking-tight sm:text-4xl"
          >
            Which shopping categories do you{" "}
            <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
              love most?
            </span>
          </motion.h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:mx-0 sm:text-base">
            Tick the categories you genuinely shop for, then cast your vote. Watch
            the bars fill up in real time — just like a YouTube poll — and see how
            your taste compares to everyone else&apos;s across{" "}
            {data.optionCount} options.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-xl border bg-card p-3 sm:p-4"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <s.icon className="size-4" />
              <span className="text-xs font-medium">{s.label}</span>
            </div>
            <div className="mt-1 text-xl font-bold tabular-nums sm:text-2xl">
              {s.value}
            </div>
            <div className="text-[11px] text-muted-foreground">{s.hint}</div>
          </motion.div>
        ))}

        {/* Leading category highlight */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-fuchsia-500/10 p-3 sm:p-4"
        >
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Crown className="size-4" />
            <span className="text-xs font-medium">Top pick</span>
          </div>
          {data.topOption ? (
            <>
              <div className="mt-1 truncate text-base font-bold sm:text-lg">
                {data.topOption.emoji} {data.topOption.name}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {data.topOption.percentage.toFixed(1)}% of{" "}
                {data.topOption.sectionName} · most-voted overall
              </div>
            </>
          ) : (
            <>
              <div className="mt-1 text-base font-bold text-muted-foreground">
                Waiting for votes…
              </div>
              <div className="text-[11px] text-muted-foreground">
                Be the first to vote and set the trend.
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
