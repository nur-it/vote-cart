"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const UNDO_WINDOW = 2 * 60; // seconds

interface FloatingVoteBarProps {
  selectedCount: number;
  hasVoted: boolean;
  voting: boolean;
  undoing: boolean;
  voteTimestamp: number | null;
  onVote: () => void;
  onUndo: () => void;
  onJumpToResults: () => void;
}

export function FloatingVoteBar({
  selectedCount,
  hasVoted,
  voting,
  undoing,
  voteTimestamp,
  onVote,
  onUndo,
  onJumpToResults,
}: FloatingVoteBarProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    if (!hasVoted || !voteTimestamp) { setSecondsLeft(0); return; }

    function tick() {
      const elapsed = Math.floor((Date.now() - voteTimestamp!) / 1000);
      const left = Math.max(0, UNDO_WINDOW - elapsed);
      setSecondsLeft(left);
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hasVoted, voteTimestamp]);

  const canUndo = secondsLeft > 0;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3 sm:pb-4">
      <motion.div
        layout
        className="pointer-events-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border bg-background/90 p-2.5 shadow-lg backdrop-blur-md sm:p-3"
      >
        <AnimatePresence mode="wait" initial={false}>
          {hasVoted ? (
            <motion.div
              key="voted"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="flex w-full items-center gap-3"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">Vote recorded! 🎉</div>
                <div className="text-xs text-muted-foreground">
                  {canUndo
                    ? `Undo available for ${mm}:${ss}`
                    : "Results are updating live as more people vote."}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {canUndo && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onUndo}
                    disabled={undoing}
                    className="gap-1.5 text-muted-foreground"
                  >
                    <RotateCcw className="size-3.5" />
                    <span className="hidden sm:inline">Undo</span>
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={onJumpToResults}>
                  <Sparkles className="size-4" />
                  <span className="hidden sm:inline">View results</span>
                  <span className="sm:hidden">Results</span>
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="flex w-full items-center gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">
                  {selectedCount > 0
                    ? `${selectedCount} categor${selectedCount === 1 ? "y" : "ies"} selected`
                    : "Pick your favourite categories"}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {selectedCount > 0
                    ? "Cast your vote to reveal live percentages."
                    : "Tick the boxes above — choose as many as you like."}
                </div>
              </div>
              <Button
                size="sm"
                onClick={onVote}
                disabled={selectedCount === 0 || voting}
                className="shrink-0"
              >
                {voting ? "Submitting…" : "Cast vote"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
