"use client";

import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Vote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { OptionResult, SectionColor } from "@/lib/types";
import { SECTION_COLORS } from "@/lib/types";

interface OptionRowProps {
  option: OptionResult;
  color: SectionColor;
  mode: "select" | "result";
  isSelected: boolean; // selected in the current (pre-vote) selection
  isUserPick: boolean; // this client actually voted for it
  onToggle: (id: string) => void;
}

function formatVotes(n: number): string {
  return n.toLocaleString("en-US");
}

export function OptionRow({
  option,
  color,
  mode,
  isSelected,
  isUserPick,
  onToggle,
}: OptionRowProps) {
  const c = SECTION_COLORS[color];

  if (mode === "select") {
    return (
      <motion.label
        layout
        className={cn(
          "group relative flex w-full cursor-pointer items-center gap-2.5 rounded-xl border p-2.5 transition-all sm:gap-3 sm:p-3",
          "hover:shadow-xs has-focus-visible:ring-2 has-focus-visible:ring-ring/50",
          isSelected
            ? cn(c.border, c.bg, "shadow-xs")
            : "border-border bg-card hover:bg-accent/50"
        )}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggle(option.id)}
          aria-label={`Vote for ${option.name}`}
          className={cn(isSelected && "border-transparent", "shrink-0")}
        />
        <span className="text-lg leading-none sm:text-xl" aria-hidden>
          {option.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-xs font-medium sm:text-sm">{option.name}</span>
            {option.isCustom && (
              <Badge
                variant="outline"
                className="shrink-0 gap-0.5 border-amber-500/40 bg-amber-500/10 px-1 py-0 text-[9px] font-medium text-amber-600 dark:text-amber-400 sm:px-1.5 sm:text-[10px]"
              >
                <Sparkles className="size-2 sm:size-2.5" /> Custom
              </Badge>
            )}
          </span>
          <span className="block truncate text-[11px] text-muted-foreground sm:text-xs">
            {option.description}
          </span>
        </span>
        {isSelected && (
          <Badge
            variant="secondary"
            className={cn("shrink-0 text-[10px] sm:text-xs", c.bg, c.text, "border-transparent")}
          >
            <Check className="size-3" /> Picked
          </Badge>
        )}
      </motion.label>
    );
  }

  // Result mode — YouTube-style poll bar
  const indicatorClass = option.isLeading
    ? cn("bg-gradient-to-r", c.gradFrom, c.gradTo)
    : c.bar;

  return (
    <motion.div
      layout
      className={cn(
        "relative rounded-xl border p-2.5 transition-colors sm:p-3",
        option.isLeading
          ? cn(c.border, c.bg)
          : "border-border bg-card",
        isUserPick && "ring-2 ring-offset-1 ring-offset-background",
        isUserPick && c.ring
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg leading-none sm:text-xl" aria-hidden>
          {option.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-xs font-semibold sm:text-sm">{option.name}</span>
            {option.isLeading && (
              <Crown
                className={cn("size-3 shrink-0 sm:size-3.5", c.text)}
                aria-label="Leading"
              />
            )}
            {option.isCustom && (
              <Badge
                variant="outline"
                className="shrink-0 gap-0.5 border-amber-500/40 bg-amber-500/10 px-1 py-0 text-[9px] font-medium text-amber-600 dark:text-amber-400 sm:px-1.5 sm:text-[10px]"
              >
                <Sparkles className="size-2 sm:size-2.5" /> Custom
              </Badge>
            )}
          </span>
          <span className="block truncate text-[11px] text-muted-foreground sm:text-xs">
            {option.description}
          </span>
        </span>
        {isUserPick && (
          <Badge
            variant="secondary"
            className={cn("shrink-0 text-[10px] sm:text-xs", c.bg, c.text, "border-transparent")}
          >
            <Vote className="size-3" /> Your pick
          </Badge>
        )}
        <span
          className={cn(
            "shrink-0 text-xs font-bold tabular-nums sm:text-sm",
            option.isLeading ? c.text : "text-foreground"
          )}
        >
          {option.percentage.toFixed(1)}%
        </span>
      </div>

      <div className="mt-1.5 flex items-center gap-2 sm:mt-2">
        <Progress
          value={option.percentage}
          indicatorClassName={indicatorClass}
          className="h-2 sm:h-2.5"
        />
        <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground sm:text-[11px]">
          {formatVotes(option.votes)} votes
        </span>
      </div>
    </motion.div>
  );
}
