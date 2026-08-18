export type SupportedLang = "en" | "ru";

/**
 * Detects if the string contains Cyrillic characters.
 * If yes -> "ru", otherwise -> "en".
 */
export function detectLanguage(text: string): SupportedLang {
  const hasCyrillic = /[а-яА-ЯёЁ]/.test(text);
  return hasCyrillic ? "ru" : "en";
}

/**
 * Translates text between English and Russian using LibreTranslate or free Google Translate fallback.
 */
export async function translateText(
  text: string,
  source: SupportedLang,
  target: SupportedLang
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed || source === target) {
    return trimmed;
  }

  // 1. Try LibreTranslate
  try {
    const libreEndpoints = [
      "https://translate.terraprint.co/translate",
      "https://libretranslate.de/translate",
      "https://translate.fedilab.app/translate",
      "https://libretranslate.com/translate",
    ];

    for (const endpoint of libreEndpoints) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3500);

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: trimmed,
            source,
            target,
            format: "text",
          }),
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (res.ok) {
          const data = await res.json();
          if (data?.translatedText && typeof data.translatedText === "string") {
            return data.translatedText.trim();
          }
        }
      } catch {
        // try next endpoint
      }
    }
  } catch (err) {
    console.warn("LibreTranslate attempt failed:", err);
  }

  // 2. High-reliability fallback (Free Google Translate API)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(
      trimmed
    )}`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = data[0]
          .map((chunk: unknown) => (Array.isArray(chunk) ? chunk[0] : ""))
          .join("")
          .trim();
        if (translated) return translated;
      }
    }
  } catch (err) {
    console.warn("Google translate fallback failed:", err);
  }

  // Fallback to original text if offline / rate limited
  return trimmed;
}

/**
 * Automatically produces bilingual { en, ru } object from input text
 */
export async function autoTranslatePair(
  text: string
): Promise<{ en: string; ru: string }> {
  const trimmed = text.trim();
  if (!trimmed) {
    return { en: "", ru: "" };
  }

  const detected = detectLanguage(trimmed);
  if (detected === "ru") {
    const en = await translateText(trimmed, "ru", "en");
    return { en: en || trimmed, ru: trimmed };
  } else {
    const ru = await translateText(trimmed, "en", "ru");
    return { en: trimmed, ru: ru || trimmed };
  }
}
