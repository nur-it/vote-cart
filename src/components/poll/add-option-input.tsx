"use client";

import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SectionColor } from "@/lib/types";
import { SECTION_COLORS } from "@/lib/types";

interface AddOptionInputProps {
  sectionId: string;
  sectionName: string;
  color: SectionColor;
  isAdding: boolean;
  hasVoted: boolean;
  onAdd: (sectionId: string, name: string) => void;
  hasAddedCustomOption: boolean;
}

const EMOJI_CHOICES = ["✨", "⭐", "💡", "🛒", "🏷️", "❤️", "🔥", "🆕"];

export function AddOptionInput({
  sectionId,
  sectionName,
  color,
  isAdding,
  onAdd,
  hasAddedCustomOption,
}: AddOptionInputProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("✨");
  const c = SECTION_COLORS[color];

  function submit() {
    const trimmed = name.trim();
    if (!trimmed || isAdding) return;
    onAdd(sectionId, trimmed);
    setName("");
    setEmoji("✨");
    setOpen(false);
  }

  // Already suggested — show a subtle one-liner, no form
  if (hasAddedCustomOption) {
    return (
      <p className="px-1 text-center text-[11px] text-muted-foreground">
        ✨ You&apos;ve already suggested a category.
      </p>
    );
  }

  // Collapsed trigger
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        )}
      >
        <Plus className="size-3.5" />
        Suggest a category
      </button>
    );
  }

  // Expanded form
  return (
    <div className={cn("rounded-xl border border-dashed bg-muted/30 p-3 space-y-2")}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          Add to {sectionName}
        </span>
        <button
          type="button"
          onClick={() => { setOpen(false); setName(""); setEmoji("✨"); }}
          className="rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-1">
        {EMOJI_CHOICES.map((e) => (
          <button
            key={e}
            type="button"
            aria-pressed={emoji === e}
            onClick={() => setEmoji(e)}
            className={cn(
              "flex size-7 items-center justify-center rounded-md border text-sm transition-colors",
              emoji === e
                ? cn(c.border, c.bg, "ring-1", c.ring)
                : "border-border bg-background hover:bg-accent"
            )}
          >
            {e}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }}
          placeholder={`e.g. Retro Vinyl, Plant Milk…`}
          maxLength={60}
          disabled={isAdding}
          className="h-9"
        />
        <Button
          type="button"
          size="sm"
          onClick={submit}
          disabled={!name.trim() || isAdding}
          className="h-9 shrink-0 gap-1"
        >
          {isAdding ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Add
        </Button>
      </div>
    </div>
  );
}
