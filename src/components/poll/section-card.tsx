"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SectionIcon } from "./icon-map";
import { OptionRow } from "./option-row";
import type { OptionResult, SectionResult } from "@/lib/types";
import { SECTION_COLORS } from "@/lib/types";
import { useLang } from "@/lib/i18n";

const INITIAL_CHUNK = 4;
const CHUNK_INCREMENT = 4;

interface SectionCardProps {
  section: SectionResult;
  options: OptionResult[];
  mode: "select" | "result";
  selectedIds: Set<string>;
  userPickIds: Set<string>;
  currentGuestId?: string;
  onToggle: (id: string) => void;
  onEditOption?: (option: OptionResult) => void;
  onDeleteOption?: (option: OptionResult) => void;
  onOpenSuggestModal?: (sectionId: string, sectionName: string, color: SectionResult["color"]) => void;
  view: "grid" | "list";
  hasVoted: boolean;
  expandedBySearch?: boolean;
  sectionRef?: (el: HTMLElement | null) => void;
}

export function SectionCard({
  section,
  options,
  mode,
  selectedIds,
  userPickIds,
  currentGuestId,
  onToggle,
  onEditOption,
  onDeleteOption,
  onOpenSuggestModal,
  view,
  hasVoted,
  expandedBySearch = false,
  sectionRef,
}: SectionCardProps) {
  const c = SECTION_COLORS[section.color];
  const { t } = useLang();

  const [visibleCount, setVisibleCount] = useState(INITIAL_CHUNK);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // In select mode, make sure selected options are always included in visible
  const selectedInSection = options.filter((o) => selectedIds.has(o.id) || userPickIds.has(o.id));
  const effectiveCount = expandedBySearch
    ? options.length
    : Math.max(visibleCount, selectedInSection.length, INITIAL_CHUNK);

  const visibleOptions = options.slice(0, effectiveCount);
  const hasMore = visibleOptions.length < options.length && !expandedBySearch;

  // YouTube-style IntersectionObserver progressive loader
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first && first.isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + CHUNK_INCREMENT);
            setIsLoadingMore(false);
          }, 350);
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore]);

  if (options.length === 0) return null;

  return (
    <Card
      ref={sectionRef}
      className={cn(
        "gap-0 overflow-hidden p-0 py-0 shadow-xs border-border/80",
        view === "list" && "max-w-3xl mx-auto w-full"
      )}
    >
      {/* Section header */}
      <div className={cn("relative border-b p-3 sm:p-4.5 transition-colors", c.bg)}>
        <div className="flex items-start sm:items-center justify-between gap-3">
          {/* Section Icon & Titles */}
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-xl bg-background shadow-xs ring-1 sm:size-11 sm:rounded-2xl",
                c.ring
              )}
            >
              <SectionIcon name={section.icon} className={cn("size-4.5 sm:size-5.5", c.text)} />
            </div>

            <div className="min-w-0 flex-1">
              {/* Title + Meta tags inline */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                  {section.name}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium border border-border/50 shadow-2xs">
                    {options.length} {t.options}
                  </span>
                  <span className="opacity-40">•</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                    <Users className="size-3 text-muted-foreground/80" />
                    {section.totalVotes.toLocaleString("en-US")} {t.votes}
                  </span>
                </div>
              </div>

              {/* Subtitle / Description - Hidden on mobile for maximum cleanliness, visible on desktop */}
              <p className="hidden sm:block mt-0.5 text-[11px] sm:text-xs text-muted-foreground/90 leading-relaxed line-clamp-2">
                {section.description}
              </p>

              {/* Result Mode: Leading Option Badge */}
              {mode === "result" && section.leadingOptionName && (
                <div className={cn("mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold", c.text)}>
                  <TrendingUp className="size-3" />
                  <span>{t.leading} {section.leadingOptionName}</span>
                  {section.leadingOptionPercentage != null && (
                    <span className="tabular-nums opacity-85">
                      ({section.leadingOptionPercentage.toFixed(1)}%)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Header Quick-Action Button: "+ Suggest Product" */}
          {onOpenSuggestModal && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onOpenSuggestModal(section.id, section.name, section.color)}
              className={cn(
                "h-8 sm:h-9 shrink-0 gap-1.5 rounded-xl border px-2.5 sm:px-3 text-xs font-semibold shadow-xs transition-all duration-200 self-start sm:self-center",
                c.border,
                c.text,
                "bg-background/90 hover:bg-background hover:scale-102"
              )}
            >
              <Plus className="size-3.5 sm:size-4" />
              <span className="hidden sm:inline">{t.suggestProductHeader}</span>
              <span className="sm:hidden">{t.suggestProductShort}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Options Grid / List */}
      <div
        className={cn(
          "p-2.5 sm:p-5",
          view === "grid"
            ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4"
            : "flex flex-col gap-2.5 sm:gap-3"
        )}
      >
        <AnimatePresence mode="popLayout">
          {visibleOptions.map((opt) => (
            <OptionRow
              key={opt.id}
              option={opt}
              color={section.color}
              mode={mode}
              view={view}
              isSelected={selectedIds.has(opt.id)}
              isUserPick={userPickIds.has(opt.id)}
              currentGuestId={currentGuestId}
              onToggle={onToggle}
              onEdit={onEditOption}
              onDelete={onDeleteOption}
            />
          ))}
        </AnimatePresence>

        {/* YouTube-Style Progressive Scroll Skeletons */}
        {isLoadingMore && (
          <>
            {Array.from({ length: Math.min(2, options.length - visibleOptions.length) }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className={cn(
                  "overflow-hidden rounded-2xl border border-border/40 bg-card p-3 space-y-3",
                  view === "list" ? "flex items-center gap-3 space-y-0" : ""
                )}
              >
                <Skeleton className={view === "list" ? "size-14 rounded-xl" : "aspect-square w-full rounded-xl"} />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </>
        )}

        {/* Intersection Sentinel */}
        {hasMore && (
          <div ref={sentinelRef} className="col-span-full h-6 w-full flex items-center justify-center">
            <span className="text-[10px] text-muted-foreground/60">{t.loadingMore}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

export function AnimatedSections({ children }: { children: React.ReactNode }) {
  return (
    <motion.div layout className="contents">
      {children}
    </motion.div>
  );
}
