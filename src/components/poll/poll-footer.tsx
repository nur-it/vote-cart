export function PollFooter() {
  return (
    <footer className="mt-auto border-t bg-card/50 pb-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="space-y-1">
          <div className="text-sm font-semibold">VoteCart</div>
          <p className="max-w-md text-xs text-muted-foreground">
            A real-time ecommerce category voting platform. Percentages are
            calculated as each option&apos;s share of all votes cast.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {["Real-time results", "100+ categories", "Community picks"].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
