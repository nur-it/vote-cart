"use client";

import { useLang } from "@/lib/i18n";
import { Vote, Zap, Layers, Flame } from "lucide-react";

export function PollFooter() {
  const { t } = useLang();

  const features = [
    { icon: Zap, label: t.featureRealtime },
    { icon: Layers, label: t.featureCategories },
    { icon: Flame, label: t.featureCommunity },
  ];

  return (
    <footer className="mt-auto border-t bg-card/40 pb-20 backdrop-blur-xs">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          {/* Brand & Description */}
          <div className="flex flex-col items-center gap-1.5 sm:items-start">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-xs sm:size-7">
                <Vote className="size-3.5" />
              </div>
              <span className="text-sm font-bold tracking-tight sm:text-base">
                VoteCart
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="live-dot inline-block size-1.5 rounded-full bg-emerald-500" />
                {t.live}
              </span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              {t.footerDesc}
            </p>
          </div>

          {/* Feature Badges - Clean Neutral Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground shadow-2xs"
                >
                  <Icon className="size-3 text-muted-foreground" />
                  <span>{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom subtle divider */}
        <div className="mt-4 flex flex-col items-center justify-between gap-1 border-t border-border/40 pt-3 text-[10px] text-muted-foreground/80 sm:flex-row">
          <span>{t.footerRights}</span>
          <span>Built for community-first commerce</span>
        </div>
      </div>
    </footer>
  );
}
