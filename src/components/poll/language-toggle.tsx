"use client";

import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LANGS: { value: Lang; flag: string; label: string }[] = [
  { value: "en", flag: "🇬🇧", label: "EN" },
  { value: "ru", flag: "🇷🇺", label: "RU" },
];

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex h-8 items-center rounded-md border bg-card p-0.5 sm:h-9">
      {LANGS.map((l) => (
        <button
          key={l.value}
          type="button"
          onClick={() => setLang(l.value)}
          aria-pressed={lang === l.value}
          className={cn(
            "flex items-center gap-1 rounded-[4px] px-2 py-1 text-xs font-medium transition-colors",
            lang === l.value
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span>{l.flag}</span>
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  );
}
