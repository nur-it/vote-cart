"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { AddOptionResponse, PollResult } from "@/lib/types";
import { FloatingVoteBar } from "./floating-vote-bar";
import { HeroHeader, HeroStats } from "./hero-stats";
import { PollFooter } from "./poll-footer";
import { PollHeader } from "./poll-header";
import { PollToolbar, type SortKey, type ViewMode } from "./poll-toolbar";
import { SectionCard } from "./section-card";
import { SectionSidebar, SectionPills } from "./section-jump-bar";
import { VoterModal } from "./voter-modal";
import { useLang } from "@/lib/i18n";

async function fetchPoll(lang: string): Promise<PollResult> {
  const res = await fetch(`/api/poll?lang=${lang}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load poll");
  return res.json();
}

export function PollApp() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { lang, t } = useLang();

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("section");
  const [view, setView] = useState<ViewMode>("grid");
  const [showResults, setShowResults] = useState(false);
  const [hasAddedCustomOption, setHasAddedCustomOption] = useState(false);
  const [localHasVoted, setLocalHasVoted] = useState(false);
  const [voteTimestamp, setVoteTimestamp] = useState<number | null>(null);
  const [isVoterModalOpen, setIsVoterModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasAddedCustomOption(localStorage.getItem("poll_added_custom_option") === "true");
      setLocalHasVoted(localStorage.getItem("poll_has_voted") === "true");
      const ts = localStorage.getItem("poll_vote_timestamp");
      if (ts) setVoteTimestamp(Number(ts));
    }
  }, []);

  const resultsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["poll", lang],
    queryFn: () => fetchPoll(lang),
    refetchOnWindowFocus: true,
  });

  const voteMutation = useMutation({
    mutationFn: async (payload: { optionIds: string[]; name: string; email: string }) => {
      const res = await fetch(`/api/poll/vote?lang=${lang}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? "Failed to submit vote");
      }
      return res.json() as Promise<PollResult>;
    },
    onSuccess: (result) => {
      setIsVoterModalOpen(false);
      queryClient.setQueryData(["poll", lang], result);
      localStorage.setItem("poll_has_voted", "true");
      setLocalHasVoted(true);
      const ts = Date.now();
      localStorage.setItem("poll_vote_timestamp", String(ts));
      setVoteTimestamp(ts);
      toast({
        title: t.toastVoteTitle,
        description: t.toastVoteDesc(selected.size),
      });
      setSelected(new Set());
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    },
    onError: (err: Error) => {
      toast({ title: t.toastVoteError, description: err.message, variant: "destructive" });
    },
  });

  const undoMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/poll/vote/undo", { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? "Failed to undo");
      }
      return res.json() as Promise<PollResult>;
    },
    onSuccess: (result) => {
      queryClient.setQueryData(["poll", lang], result);
      localStorage.removeItem("poll_has_voted");
      localStorage.removeItem("poll_vote_timestamp");
      setLocalHasVoted(false);
      setVoteTimestamp(null);
      toast({ title: t.toastUndoTitle, description: t.toastUndoDesc });
    },
    onError: (err: Error) => {
      toast({ title: t.toastUndoError, description: err.message, variant: "destructive" });
    },
  });

  const resetMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/poll/reset", { method: "POST" });
      if (!res.ok) throw new Error("Failed to reset");
      return res.json() as Promise<PollResult>;
    },
    onSuccess: (result) => {
      queryClient.setQueryData(["poll"], result);
      toast({
        title: "Vote reset",
        description: "You can vote again. Your previous votes stay in the totals.",
      });
    },
  });

  const addOptionMutation = useMutation({
    mutationFn: async (vars: { sectionId: string; name: string; emoji?: string; imageUrl?: string }) => {
      const res = await fetch(`/api/poll/option?lang=${lang}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vars),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? "Failed to add option");
      }
      return res.json() as Promise<AddOptionResponse>;
    },
    onSuccess: (result, vars) => {
      queryClient.setQueryData(["poll", lang], result.poll);
      if (result.option.created) {
        localStorage.setItem("poll_added_custom_option", "true");
        setHasAddedCustomOption(true);
      }
      if (!result.poll.hasVoted) {
        setSelected((prev) => {
          const next = new Set(prev);
          next.add(result.option.id);
          return next;
        });
      }
      const sectionName = result.poll.sections.find((s) => s.id === vars.sectionId)?.name ?? "this category";
      toast({
        title: result.option.created
          ? t.toastAddedTitle(result.option.name)
          : t.toastExistsTitle(result.option.name, sectionName),
        description: result.option.created
          ? t.toastAddedDescPre(sectionName, result.poll.hasVoted ? t.toastAddedDescVoted : t.toastAddedDescNotVoted)
          : t.toastAddedDescExisting,
      });
    },
    onError: (err: Error) => {
      toast({ title: t.toastAddError, description: err.message, variant: "destructive" });
    },
  });

  const hasVoted = !!data?.hasVoted || localHasVoted;

  // Sync voteTimestamp from server (handles new browser / no localStorage)
  useEffect(() => {
    if (data?.votedAt && !voteTimestamp) {
      setVoteTimestamp(data.votedAt);
    }
  }, [data?.votedAt, voteTimestamp]);
  const mode: "select" | "result" = hasVoted || showResults ? "result" : "select";
  const userPickIds = useMemo(
    () => new Set(data?.votedOptionIds ?? []),
    [data?.votedOptionIds]
  );

  const toggleOption = useCallback((id: string) => {
    if (hasVoted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, [hasVoted]);

  const handleVoteClick = useCallback(() => {
    if (selected.size === 0 || hasVoted) return;
    setIsVoterModalOpen(true);
  }, [selected, hasVoted]);

  const handleModalSubmit = useCallback(
    (voter: { name: string; email: string }) => {
      if (selected.size === 0 || hasVoted) return;
      voteMutation.mutate({
        optionIds: Array.from(selected),
        name: voter.name,
        email: voter.email,
      });
    },
    [selected, hasVoted, voteMutation]
  );

  const handleUndo = useCallback(() => {
    undoMutation.mutate();
  }, [undoMutation]);

  const handleReset = useCallback(() => {
    // Reset is disabled — once voted, it's permanent
  }, []);

  const handleAddOption = useCallback(
    (sectionId: string, name: string, emoji?: string, imageUrl?: string) => {
      addOptionMutation.mutate({ sectionId, name, emoji, imageUrl });
    },
    [addOptionMutation]
  );

  const jumpToResults = useCallback(() => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Filter + sort
  const processedSections = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    const sections = data.sections.map((s) => {
      const filtered = s.options.filter((o) => {
        if (!q) return true;
        return (
          o.name.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q)
        );
      });
      return { ...s, options: filtered };
    });

    const visible = sections.filter((s) => s.options.length > 0);

    // sort options within sections
    const sortedOptions = visible.map((s) => {
      const opts = [...s.options];
      if (sort === "name") opts.sort((a, b) => a.name.localeCompare(b.name));
      else opts.sort((a, b) => b.votes - a.votes); // popularity & section → by votes
      return { ...s, options: opts };
    });

    // sort sections
    if (sort === "popularity") {
      sortedOptions.sort((a, b) => b.totalVotes - a.totalVotes);
    } else if (sort === "name") {
      sortedOptions.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sortedOptions.sort((a, b) => a.order - b.order);
    }

    return sortedOptions;
  }, [data, search, sort]);

  // sections that have search-matched options (for auto-expand)
  const searchMatchedSectionIds = useMemo(() => {
    if (!search.trim()) return new Set<string>();
    return new Set(processedSections.map((s) => s.id));
  }, [search, processedSections]);

  const totalResultsShown = processedSections.reduce(
    (a, s) => a + s.options.length,
    0
  );

  return (
    <div className="flex min-h-screen flex-col">
      <PollHeader
        voterCount={data?.voterCount ?? 0}
        totalVotes={data?.totalVotes ?? 0}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-3.5 pb-24 pt-4 sm:px-4 sm:pb-32 sm:pt-6">
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : data ? (
          <div className="space-y-4 sm:space-y-6">
            <HeroHeader hasVoted={hasVoted} />

            <PollToolbar
              search={search}
              onSearchChange={setSearch}
              sort={sort}
              onSortChange={setSort}
              view={view}
              onViewChange={setView}
              showResults={showResults || hasVoted}
              onShowResultsChange={(v) => setShowResults(v)}
              hasVoted={hasVoted}
              resultCount={totalResultsShown}
            />

            {mode === "result" && !hasVoted && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-300 sm:px-4 sm:py-2.5 sm:text-sm">
                {t.bannerPreview}
              </div>
            )}


            {/* Section jump pills — mobile/tablet only */}
            {processedSections.length > 0 && (
              <SectionPills sections={processedSections} sectionRefs={sectionRefs} />
            )}

            {/* Main content: sidebar + cards */}
            <div className="flex gap-6">
              <SectionSidebar sections={processedSections} sectionRefs={sectionRefs} hidden={view === "grid"} />

              <div ref={resultsRef} className={cn("min-w-0 flex-1", cnGrid(view))}>
                {processedSections.map((section) => (
                  <motion.div
                    key={section.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={view === "grid" ? "min-w-0" : "w-full"}
                  >
                    <SectionCard
                      section={section}
                      options={section.options}
                      mode={mode}
                      selectedIds={selected}
                      userPickIds={userPickIds}
                      onToggle={toggleOption}
                      view={view}
                      hasVoted={hasVoted}
                      addingSectionId={
                        addOptionMutation.isPending
                          ? addOptionMutation.variables?.sectionId ?? null
                          : null
                      }
                      onAddOption={handleAddOption}
                      hasAddedCustomOption={hasAddedCustomOption}
                      expandedBySearch={searchMatchedSectionIds.has(section.id) && !!search.trim()}
                      sectionRef={(el) => {
                        if (el) sectionRefs.current.set(section.id, el);
                        else sectionRefs.current.delete(section.id);
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {processedSections.length === 0 && (
              <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
                {t.noMatch(search)}
              </div>
            )}

            {/* Simple stats bar placed below all lists & above footer */}
            <HeroStats data={data} hasVoted={hasVoted} />
          </div>
        ) : null}
      </main>

      <PollFooter />

      <FloatingVoteBar
        selectedCount={selected.size}
        hasVoted={hasVoted}
        voting={voteMutation.isPending}
        undoing={undoMutation.isPending}
        voteTimestamp={voteTimestamp}
        onVote={handleVoteClick}
        onUndo={handleUndo}
        onJumpToResults={jumpToResults}
      />

      <VoterModal
        open={isVoterModalOpen}
        onOpenChange={setIsVoterModalOpen}
        selectedCount={selected.size}
        isSubmitting={voteMutation.isPending}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

function cnGrid(view: ViewMode): string {
  return view === "grid"
    ? "flex flex-col gap-6 w-full"
    : "flex flex-col gap-4 max-w-3xl mx-auto w-full";
}

function LoadingState() {
  return (
    <div className="space-y-5">
      {/* HeroStats skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
      {/* Toolbar skeleton */}
      <Skeleton className="h-14 rounded-xl" />
      {/* Cards skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <p className="text-sm text-muted-foreground">{t.errorLoad}</p>
      <button onClick={onRetry} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        {t.retry}
      </button>
    </div>
  );
}
