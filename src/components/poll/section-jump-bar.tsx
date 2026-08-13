"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SectionIcon } from "./icon-map";
import { SECTION_COLORS } from "@/lib/types";
import type { SectionResult } from "@/lib/types";
import { useLang } from "@/lib/i18n";

interface Props {
  sections: SectionResult[];
  sectionRefs: React.RefObject<Map<string, HTMLElement> | null>;
  hidden?: boolean;
}

function useActiveSection(sections: Props["sections"], sectionRefs: Props["sectionRefs"]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const map = sectionRefs.current;
    if (!map) return;
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = map.get(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(s.id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections, sectionRefs]);

  return activeId;
}

function useJumpTo(sectionRefs: Props["sectionRefs"]) {
  return (id: string) => {
    const el = sectionRefs.current?.get(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  };
}

/** Desktop sticky sidebar — xl+ only */
export function SectionSidebar({ sections, sectionRefs, hidden }: Props) {
  const activeId = useActiveSection(sections, sectionRefs);
  const jumpTo = useJumpTo(sectionRefs);
  const { t } = useLang();

  if (hidden) return null;

  return (
    <aside className="hidden xl:flex xl:flex-col xl:w-44 xl:shrink-0">
      <div className="sticky top-35 flex flex-col gap-1">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {t.sections}
        </p>
        {sections.map((s) => {
          const c = SECTION_COLORS[s.color];
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => jumpTo(s.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-medium transition-colors",
                isActive
                  ? cn("bg-accent", c.text)
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              )}
            >
              <SectionIcon name={s.icon} className={cn("size-3.5 shrink-0", isActive && c.text)} />
              <span className="truncate">{s.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

/** Mobile/tablet horizontal pill row — hidden on xl+ */
export function SectionPills({ sections, sectionRefs }: Props) {
  const activeId = useActiveSection(sections, sectionRefs);
  const jumpTo = useJumpTo(sectionRefs);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeId || !pillsRef.current) return;
    const pill = pillsRef.current.querySelector(`[data-id="${activeId}"]`) as HTMLElement | null;
    if (pill && pillsRef.current) {
      const container = pillsRef.current;
      const pillLeft = pill.offsetLeft;
      const pillWidth = pill.offsetWidth;
      const containerWidth = container.clientWidth;
      const targetScrollLeft = pillLeft - containerWidth / 2 + pillWidth / 2;
      container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <div
      ref={pillsRef}
      className="xl:hidden -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 pt-0.5"
      style={{ scrollbarWidth: "none" }}
    >
      {sections.map((s) => {
        const c = SECTION_COLORS[s.color];
        const isActive = activeId === s.id;
        return (
          <button
            key={s.id}
            data-id={s.id}
            type="button"
            onClick={() => jumpTo(s.id)}
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap sm:gap-1.5 sm:px-3 sm:text-xs",
              isActive
                ? cn(c.bg, c.text, c.border)
                : "border-border bg-card text-muted-foreground hover:bg-accent"
            )}
          >
            <SectionIcon name={s.icon} className="size-3 shrink-0" />
            {s.name}
          </button>
        );
      })}
    </div>
  );
}
