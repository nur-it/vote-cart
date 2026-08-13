"use client";

import { LayoutGrid, List, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

export type SortKey = "popularity" | "name" | "section";
export type ViewMode = "grid" | "list";

interface PollToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  sort: SortKey;
  onSortChange: (v: SortKey) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  showResults: boolean;
  onShowResultsChange: (v: boolean) => void;
  hasVoted: boolean;
  resultCount: number;
}

export function PollToolbar({
  search, onSearchChange, sort, onSortChange, view, onViewChange,
  showResults, onShowResultsChange, hasVoted, resultCount,
}: PollToolbarProps) {
  const { t } = useLang();
  return (
    <div className="sticky top-[52px] z-30 -mx-4 border-b bg-background/90 px-3 py-2 backdrop-blur-md sm:top-[65px] sm:mx-0 sm:rounded-xl sm:border sm:px-3 sm:py-3">
      <div className="flex flex-col gap-2 sm:gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground sm:left-3 sm:size-4" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="h-8.5 pl-8 pr-8 text-xs sm:h-10 sm:pl-9 sm:pr-9 sm:text-sm"
            aria-label={t.searchPlaceholder}
          />
          {search && (
            <button type="button" onClick={() => onSearchChange("")} aria-label="Clear search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-0.5 sm:pb-0 sm:justify-start sm:gap-2">
          <Select value={sort} onValueChange={(v) => onSortChange(v as SortKey)}>
            <SelectTrigger className="h-8 text-[11px] font-medium sm:h-10 sm:w-[150px] sm:text-xs" aria-label="Sort options">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">{t.sortPopular}</SelectItem>
              <SelectItem value="name">{t.sortName}</SelectItem>
              <SelectItem value="section">{t.sortSection}</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex h-8 items-center rounded-md border bg-card p-0.5 sm:h-10">
            <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => onViewChange("grid")}
              className={cn("flex size-7 items-center justify-center rounded-[4px] transition-colors sm:size-9 sm:rounded-[5px]",
                view === "grid" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground")}>
              <LayoutGrid className="size-3.5 sm:size-4" />
            </button>
            <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => onViewChange("list")}
              className={cn("flex size-7 items-center justify-center rounded-[4px] transition-colors sm:size-9 sm:rounded-[5px]",
                view === "list" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground")}>
              <List className="size-3.5 sm:size-4" />
            </button>
          </div>

          <div className="flex h-8 items-center gap-1.5 rounded-md border bg-card px-2 text-[11px] sm:h-10 sm:gap-2 sm:px-3 sm:text-xs">
            <Switch id="live-results" checked={showResults} onCheckedChange={onShowResultsChange}
              aria-label="Toggle live results" className="scale-75 sm:scale-100" />
            <span className="whitespace-nowrap font-medium">{t.liveToggle}</span>
          </div>
        </div>
      </div>

      {search && (
        <p className="mt-1.5 text-[11px] text-muted-foreground sm:text-xs">
          {t.resultCount(resultCount)} "{search}".
        </p>
      )}
    </div>
  );
}
