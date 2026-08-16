"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, ImageIcon, Sparkles, Vote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { OptionResult, SectionColor } from "@/lib/types";
import { SECTION_COLORS } from "@/lib/types";
import { useLang } from "@/lib/i18n";

interface OptionRowProps {
  option: OptionResult;
  color: SectionColor;
  mode: "select" | "result";
  view?: "grid" | "list";
  isSelected: boolean;
  isUserPick: boolean;
  onToggle: (id: string) => void;
}

function formatVotes(n: number): string {
  return n.toLocaleString("en-US");
}

function OptionImage({
  imageUrl,
  emoji,
  name,
  className,
  fallbackClassName,
}: {
  imageUrl?: string | null;
  emoji: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (!imageUrl || imgError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-linear-to-br from-muted/60 via-muted/30 to-background text-2xl select-none",
          fallbackClassName
        )}
        aria-hidden
      >
        <span className="text-3xl sm:text-4xl drop-shadow-sm">{emoji || <ImageIcon className="size-6 text-muted-foreground" />}</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setImgError(true)}
      className={cn("object-cover transition-transform duration-500", className)}
    />
  );
}

export function OptionRow({
  option,
  color,
  mode,
  view = "grid",
  isSelected,
  isUserPick,
  onToggle,
}: OptionRowProps) {
  const c = SECTION_COLORS[color];
  const { t } = useLang();
  const indicatorClass = option.isLeading ? cn("bg-gradient-to-r", c.gradFrom, c.gradTo) : c.bar;

  // -------------------------------------------------------------
  // GRID VIEW (Large Visual Category Cards)
  // -------------------------------------------------------------
  if (view === "grid") {
    if (mode === "select") {
      return (
        <motion.div
          layout
          role="button"
          tabIndex={0}
          onClick={() => onToggle(option.id)}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onToggle(option.id);
            }
          }}
          className={cn(
            "group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card cursor-pointer transition-all duration-300 select-none",
            "hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            isSelected
              ? cn(c.border, c.bg, "shadow-md ring-2 ring-offset-1 ring-offset-background", c.ring)
              : "border-border/70 hover:border-border"
          )}
        >
          {/* Card Top Image */}
          <div className="relative aspect-square w-full overflow-hidden bg-muted/40 border-b border-border/40">
            <OptionImage
              imageUrl={option.imageUrl}
              emoji={option.emoji}
              name={option.name}
              className="h-full w-full group-hover:scale-105"
              fallbackClassName="h-full w-full"
            />

            {/* Subtle overlay gradient */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />

            {/* Checkbox overlay badge */}
            <div className="pointer-events-none absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-lg backdrop-blur-md bg-background/85 px-2 py-1 shadow-sm border border-border/40">
              <Checkbox
                checked={isSelected}
                tabIndex={-1}
                aria-label={`Vote for ${option.name}`}
                className={cn(isSelected && "border-transparent", "size-4 shrink-0")}
              />
              <span className="text-[11px] font-medium text-foreground">
                {isSelected ? t.picked : "Select"}
              </span>
            </div>

            {/* Custom Tag Badge */}
            {option.isCustom && (
              <Badge
                variant="outline"
                className="absolute right-2.5 top-2.5 gap-1 border-amber-500/50 bg-amber-500/90 text-amber-950 backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-semibold shadow-xs"
              >
                <Sparkles className="size-2.5" /> {t.custom}
              </Badge>
            )}

            {/* Emoji chip over bottom left of image */}
            <div className="absolute left-2.5 bottom-2 flex items-center justify-center size-7 rounded-full bg-background/90 backdrop-blur-md shadow-sm border border-border/30 text-sm">
              {option.emoji}
            </div>

            {isSelected && (
              <div className="absolute right-2.5 bottom-2">
                <Badge className={cn("gap-1 text-[11px] font-medium shadow-sm", c.bar, "text-white")}>
                  <Check className="size-3" /> {t.picked}
                </Badge>
              </div>
            )}
          </div>

          {/* Card Body */}
          <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
            <div>
              <h4 className="font-semibold text-sm sm:text-base leading-snug tracking-tight line-clamp-2 text-foreground">
                {option.name}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {option.description}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2.5 text-xs text-muted-foreground">
              <span className="font-medium">{t.votes}: {formatVotes(option.votes)}</span>
              <span className={cn("text-xs font-semibold", isSelected ? c.text : "text-muted-foreground")}>
                {isSelected ? "✓ Selected" : "Tap to choose"}
              </span>
            </div>
          </div>
        </motion.div>
      );
    }

    // Grid - Result Mode
    return (
      <motion.div
        layout
        className={cn(
          "relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card transition-all duration-300 shadow-xs",
          option.isLeading ? cn(c.border, c.bg, "shadow-md") : "border-border/70",
          isUserPick && "ring-2 ring-offset-2 ring-offset-background",
          isUserPick && c.ring
        )}
      >
        {/* Top Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-muted/40 border-b border-border/40">
          <OptionImage
            imageUrl={option.imageUrl}
            emoji={option.emoji}
            name={option.name}
            className="h-full w-full"
            fallbackClassName="h-full w-full"
          />

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

          {/* Leading / Crown badge */}
          {option.isLeading && (
            <Badge className={cn("absolute left-2.5 top-2.5 gap-1 shadow-sm font-semibold text-xs", c.bar, "text-white")}>
              <Crown className="size-3" /> Leading #{option.rank}
            </Badge>
          )}

          {option.isCustom && (
            <Badge
              variant="outline"
              className="absolute right-2.5 top-2.5 gap-1 border-amber-500/50 bg-amber-500/90 text-amber-950 backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-semibold shadow-xs"
            >
              <Sparkles className="size-2.5" /> {t.custom}
            </Badge>
          )}

          {isUserPick && (
            <div className="absolute right-2.5 top-2.5">
              <Badge variant="secondary" className={cn("gap-1 text-xs font-medium shadow-sm", c.bg, c.text)}>
                <Vote className="size-3" /> {t.yourPick}
              </Badge>
            </div>
          )}

          {/* Emoji */}
          <div className="absolute left-2.5 bottom-2 flex items-center justify-center size-7 rounded-full bg-background/90 backdrop-blur-md shadow-sm border border-border/30 text-sm">
            {option.emoji}
          </div>

          <div className="absolute right-2.5 bottom-2 rounded-lg bg-black/75 px-2 py-0.5 backdrop-blur-md border border-white/10">
            <span className="text-xs font-bold text-white tabular-nums">
              {option.percentage.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
          <div>
            <div className="flex items-start justify-between gap-1.5">
              <h4 className="font-semibold text-sm sm:text-base leading-snug tracking-tight text-foreground line-clamp-2">
                {option.name}
              </h4>
            </div>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {option.description}
            </p>
          </div>

          <div className="mt-3 space-y-1.5 border-t border-border/40 pt-2.5">
            <Progress value={option.percentage} indicatorClassName={indicatorClass} className="h-2" />
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{formatVotes(option.votes)} {t.votes}</span>
              <span className="font-medium text-foreground">{option.percentage.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // -------------------------------------------------------------
  // LIST VIEW (Prominent Thumbnail Row)
  // -------------------------------------------------------------
  if (mode === "select") {
    return (
      <motion.div
        layout
        role="button"
        tabIndex={0}
        onClick={() => onToggle(option.id)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            onToggle(option.id);
          }
        }}
        className={cn(
          "group relative flex w-full cursor-pointer items-center gap-3 rounded-2xl border p-2.5 transition-all duration-200 sm:gap-4 sm:p-3.5 select-none",
          "hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          isSelected ? cn(c.border, c.bg, "shadow-xs ring-1", c.ring) : "border-border bg-card hover:bg-accent/40"
        )}
      >
        <div className="pointer-events-none shrink-0">
          <Checkbox
            checked={isSelected}
            tabIndex={-1}
            aria-label={`Vote for ${option.name}`}
            className={cn(isSelected && "border-transparent", "size-4 sm:size-5")}
          />
        </div>

        {/* Thumbnail */}
        <div className="relative size-14 sm:size-18 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/40">
          <OptionImage
            imageUrl={option.imageUrl}
            emoji={option.emoji}
            name={option.name}
            className="h-full w-full group-hover:scale-105"
            fallbackClassName="h-full w-full"
          />
        </div>

        {/* Text Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-xs font-semibold sm:text-sm text-foreground">{option.name}</span>
            {option.isCustom && (
              <Badge variant="outline" className="shrink-0 gap-0.5 border-amber-500/40 bg-amber-500/10 px-1 py-0 text-[9px] font-medium text-amber-600 dark:text-amber-400 sm:px-1.5 sm:text-[10px]">
                <Sparkles className="size-2 sm:size-2.5" /> {t.custom}
              </Badge>
            )}
          </div>
          <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground sm:text-xs">{option.description}</p>
        </div>

        {isSelected && (
          <Badge variant="secondary" className={cn("shrink-0 text-[10px] sm:text-xs", c.bg, c.text, "border-transparent")}>
            <Check className="size-3" /> {t.picked}
          </Badge>
        )}
      </motion.div>
    );
  }

  // List - Result Mode
  return (
    <motion.div
      layout
      className={cn(
        "relative flex flex-col gap-2 rounded-2xl border p-2.5 transition-colors sm:p-3.5",
        option.isLeading ? cn(c.border, c.bg) : "border-border bg-card",
        isUserPick && "ring-2 ring-offset-1 ring-offset-background",
        isUserPick && c.ring
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Thumbnail */}
        <div className="relative size-14 sm:size-18 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/40">
          <OptionImage
            imageUrl={option.imageUrl}
            emoji={option.emoji}
            name={option.name}
            className="h-full w-full"
            fallbackClassName="h-full w-full"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-xs font-semibold sm:text-sm text-foreground">{option.name}</span>
            {option.isLeading && <Crown className={cn("size-3 shrink-0 sm:size-3.5", c.text)} aria-label="Leading" />}
            {option.isCustom && (
              <Badge variant="outline" className="shrink-0 gap-0.5 border-amber-500/40 bg-amber-500/10 px-1 py-0 text-[9px] font-medium text-amber-600 dark:text-amber-400 sm:px-1.5 sm:text-[10px]">
                <Sparkles className="size-2 sm:size-2.5" /> {t.custom}
              </Badge>
            )}
          </div>
          <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground sm:text-xs">{option.description}</p>
        </div>

        {isUserPick && (
          <Badge variant="secondary" className={cn("shrink-0 text-[10px] sm:text-xs", c.bg, c.text, "border-transparent")}>
            <Vote className="size-3" /> {t.yourPick}
          </Badge>
        )}
        <span className={cn("shrink-0 text-xs font-bold tabular-nums sm:text-sm", option.isLeading ? c.text : "text-foreground")}>
          {option.percentage.toFixed(1)}%
        </span>
      </div>

      <div className="mt-0.5 flex items-center gap-2 sm:mt-1">
        <Progress value={option.percentage} indicatorClassName={indicatorClass} className="h-2 sm:h-2.5" />
        <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground sm:text-[11px]">
          {formatVotes(option.votes)} {t.votes}
        </span>
      </div>
    </motion.div>
  );
}
