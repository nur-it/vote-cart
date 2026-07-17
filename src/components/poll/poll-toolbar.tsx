"use client";

import {
  LayoutGrid,
  List,
  Search,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

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
  search,
  onSearchChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  showResults,
  onShowResultsChange,
  hasVoted,
  resultCount,
}: PollToolbarProps) {
  return (
    <div className="sticky top-[57px] z-30 -mx-4 border-b bg-background/80 px-4 py-3 backdrop-blur-md sm:top-[65px] sm:mx-0 sm:rounded-xl sm:border sm:px-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 100+ categories… (e.g. kids, coffee, sneakers)"
            className="h-10 pl-9 pr-9"
            aria-label="Search categories"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Select value={sort} onValueChange={(v) => onSortChange(v as SortKey)}>
            <SelectTrigger className="h-10 w-[150px]" aria-label="Sort options">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most popular</SelectItem>
              <SelectItem value="name">A → Z</SelectItem>
              <SelectItem value="section">By section</SelectItem>
            </SelectContent>
          </Select>

          {/* View toggle */}
          <div className="flex h-10 items-center rounded-md border bg-card p-0.5">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => onViewChange("grid")}
              className={cn(
                "flex size-9 items-center justify-center rounded-[5px] transition-colors",
                view === "grid"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => onViewChange("list")}
              className={cn(
                "flex size-9 items-center justify-center rounded-[5px] transition-colors",
                view === "list"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="size-4" />
            </button>
          </div>

          {/* Live results toggle */}
          <div className="flex h-10 items-center gap-2 rounded-md border bg-card px-3">
            <Switch
              id="live-results"
              checked={showResults}
              onCheckedChange={onShowResultsChange}
              aria-label="Toggle live results"
            />
            <span className="whitespace-nowrap text-xs font-medium">
              Live results
            </span>
          </div>

        </div>
      </div>

      {search && (
        <p className="mt-2 text-xs text-muted-foreground">
          {resultCount} categor{resultCount === 1 ? "y" : "ies"} match
          {" “"}
          {search}
          {"”."}
        </p>
      )}
    </div>
  );
}
