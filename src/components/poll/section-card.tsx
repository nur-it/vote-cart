"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AddOptionInput } from "./add-option-input";
import { SectionIcon } from "./icon-map";
import { OptionRow } from "./option-row";
import type { OptionResult, SectionResult } from "@/lib/types";
import { SECTION_COLORS } from "@/lib/types";

const INITIAL_VISIBLE = 4;

interface SectionCardProps {
  section: SectionResult;
  options: OptionResult[];
  mode: "select" | "result";
  selectedIds: Set<string>;
  userPickIds: Set<string>;
  onToggle: (id: string) => void;
  view: "grid" | "list";
  hasVoted: boolean;
  addingSectionId: string | null;
  onAddOption: (sectionId: string, name: string) => void;
  hasAddedCustomOption: boolean;
  expandedBySearch?: boolean;
  sectionRef?: (el: HTMLElement | null) => void;
}

export function SectionCard({
  section,
  options,
  mode,
  selectedIds,
  userPickIds,
  onToggle,
  view,
  hasVoted,
  addingSectionId,
  onAddOption,
  hasAddedCustomOption,
  expandedBySearch = false,
  sectionRef,
}: SectionCardProps) {
  const c = SECTION_COLORS[section.color];
  const [expanded, setExpanded] = useState(false);
  const isExpanded = expanded || expandedBySearch;

  if (options.length === 0) return null;

  // In select mode, always show options that are selected even if collapsed
  const selectedInSection = options.filter((o) => selectedIds.has(o.id) || userPickIds.has(o.id));
  const visibleOptions = isExpanded
    ? options
    : options.slice(0, Math.max(INITIAL_VISIBLE, selectedInSection.length));
  const hiddenCount = options.length - visibleOptions.length;

  return (
    <Card
      ref={sectionRef}
      className={cn(
        "gap-0 overflow-hidden p-0 py-0",
        view === "list" && "max-w-3xl mx-auto w-full"
      )}
    >
      {/* Section header */}
      <div className={cn("relative border-b p-4", c.bg)}>
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl bg-background shadow-sm ring-1",
              c.ring
            )}
          >
            <SectionIcon name={section.icon} className={cn("size-5", c.text)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold leading-tight">
                {section.name}
              </h3>
              <Badge variant="outline" className="border-border/60">
                {options.length} options
              </Badge>
            </div>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {section.description}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Users className="size-3.5" />
            {section.totalVotes.toLocaleString("en-US")} votes
          </span>
          {mode === "result" && section.leadingOptionName && (
            <span className={cn("inline-flex items-center gap-1 font-medium", c.text)}>
              <TrendingUp className="size-3.5" />
              Leading: {section.leadingOptionName}
              {section.leadingOptionPercentage != null && (
                <span className="tabular-nums opacity-80">
                  ({section.leadingOptionPercentage.toFixed(1)}%)
                </span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="grid gap-2 p-3 sm:p-4">
        {visibleOptions.map((opt) => (
          <OptionRow
            key={opt.id}
            option={opt}
            color={section.color}
            mode={mode}
            isSelected={selectedIds.has(opt.id)}
            isUserPick={userPickIds.has(opt.id)}
            onToggle={onToggle}
          />
        ))}

        {/* Show more / less toggle */}
        {options.length > INITIAL_VISIBLE && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={cn(
              "flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
              c.text && isExpanded && cn("border-current/30", c.text)
            )}
          >
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex"
            >
              <ChevronDown className="size-3.5" />
            </motion.span>
            {isExpanded ? "Show less" : `Show ${hiddenCount} more`}
          </button>
        )}

        {!hasVoted && (
          <AddOptionInput
            sectionId={section.id}
            sectionName={section.name}
            color={section.color}
            isAdding={addingSectionId === section.id}
            hasVoted={hasVoted}
            onAdd={onAddOption}
            hasAddedCustomOption={hasAddedCustomOption}
          />
        )}
      </div>
    </Card>
  );
}

export function AnimatedSections({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div layout className="contents">
      {children}
    </motion.div>
  );
}
