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
import { useLang } from "@/lib/i18n";

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
  onAddOption: (sectionId: string, name: string, emoji?: string, imageUrl?: string) => void;
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
  const { t } = useLang();

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
      <div className={cn("relative border-b p-3 sm:p-4", c.bg)}>
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg bg-background shadow-xs ring-1 sm:size-10 sm:rounded-xl",
              c.ring
            )}
          >
            <SectionIcon name={section.icon} className={cn("size-4 sm:size-5", c.text)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h3 className="text-sm font-semibold leading-tight sm:text-base">
                {section.name}
              </h3>
              <Badge variant="outline" className="border-border/60 text-[10px] px-1.5 py-0 sm:text-xs sm:px-2 sm:py-0.5">
                {options.length} {t.options}
              </Badge>
            </div>
            <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground sm:text-xs">
              {section.description}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:mt-3 sm:gap-x-4 sm:text-xs">
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Users className="size-3 sm:size-3.5" />
            {section.totalVotes.toLocaleString("en-US")} {t.votes}
          </span>
          {mode === "result" && section.leadingOptionName && (
            <span className={cn("inline-flex items-center gap-1 font-medium", c.text)}>
              <TrendingUp className="size-3 sm:size-3.5" />
              {t.leading} {section.leadingOptionName}
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
      <div
        className={cn(
          "p-3 sm:p-5",
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4"
            : "flex flex-col gap-2.5 sm:gap-3"
        )}
      >
        {visibleOptions.map((opt) => (
          <OptionRow
            key={opt.id}
            option={opt}
            color={section.color}
            mode={mode}
            view={view}
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
              "col-span-full flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground text-center",
              c.text && isExpanded && cn("border-current/30", c.text)
            )}
          >
            <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
              <ChevronDown className="size-3.5" />
            </motion.span>
            {isExpanded ? t.showLess : t.showMore(hiddenCount)}
          </button>
        )}

        {!hasVoted && (
          <div className="col-span-full">
            <AddOptionInput
              sectionId={section.id}
              sectionName={section.name}
              color={section.color}
              isAdding={addingSectionId === section.id}
              hasVoted={hasVoted}
              onAdd={onAddOption}
              hasAddedCustomOption={hasAddedCustomOption}
            />
          </div>
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
