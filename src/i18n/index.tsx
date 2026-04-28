import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import ptBR from "./locales/pt-BR";
import en from "./locales/en";
import es from "./locales/es";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Locale = "pt-BR" | "en" | "es";

/** Deeply-nested translation object. We widen literal types to string so
 *  all locale files are assignable to the same shape. */
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends Record<string, unknown>
      ? DeepStringify<T[K]>
      : T[K];
};

type TranslationMap = DeepStringify<typeof ptBR>;

export interface I18nContextValue {
  /** Current active locale. */
  locale: Locale;
  /** Switch to a different locale. Persists in localStorage. */
  setLocale: (locale: Locale) => void;
  /**
   * Look up a translation by dot-path.
   * @example t('hero.title') // => "Onde Historias Ganham Vida"
   */
  t: (path: string) => string;
}

// ---------------------------------------------------------------------------
// Locale registry
// ---------------------------------------------------------------------------

const translations: Record<Locale, TranslationMap> = {
  "pt-BR": ptBR,
  en,
  es,
};

const SUPPORTED_LOCALES: Locale[] = ["pt-BR", "en", "es"];
const DEFAULT_LOCALE: Locale = "pt-BR";
const STORAGE_KEY = "magic-move-locale";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resolve a dot-separated path against a nested object.
 * Returns the value if found, or the path itself as a fallback so missing
 * keys are visible during development.
 */
function getByPath(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") {
      return path; // fallback
    }
    current = (current as Record<string, unknown>)[key];
  }

  if (typeof current === "string") return current;
  if (typeof current === "number") return String(current);
  return path; // fallback — path itself so missing keys are easy to spot
}

/**
 * Detect the best matching locale from the browser's language preferences.
 */
function detectLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;

  const languages = navigator.languages ?? [navigator.language];

  for (const lang of languages) {
    // Exact match first (e.g. "pt-BR")
    const exact = SUPPORTED_LOCALES.find(
      (l) => l.toLowerCase() === lang.toLowerCase(),
    );
    if (exact) return exact;

    // Prefix match (e.g. "pt" -> "pt-BR", "es-AR" -> "es")
    const prefix = lang.split("-")[0].toLowerCase();
    const partial = SUPPORTED_LOCALES.find(
      (l) => l.toLowerCase().startsWith(prefix),
    );
    if (partial) return partial;
  }

  return DEFAULT_LOCALE;
}

/**
 * Read the persisted locale from localStorage, falling back to browser
 * detection, then to the default.
 */
function getInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) {
      return stored as Locale;
    }
  } catch {
    // localStorage may be unavailable (private browsing, SSR, etc.)
  }

  return detectLocale();
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const I18nContext = createContext<I18nContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface I18nProviderProps {
  children: ReactNode;
  /** Override the initial locale (useful for tests / SSR). */
  defaultLocale?: Locale;
}

export function I18nProvider({ children, defaultLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(
    defaultLocale ?? getInitialLocale,
  );

  // Persist choice & update <html lang>
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    document.documentElement.lang = next;
  }, []);

  // Sync <html lang> on mount and when locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (path: string): string =>
      getByPath(
        translations[locale] as unknown as Record<string, unknown>,
        path,
      ),
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the i18n context from any component inside `<I18nProvider>`.
 *
 * @example
 * const { t, locale, setLocale } = useTranslation();
 * <h1>{t('hero.title')}</h1>
 */
export function useTranslation(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error(
      "useTranslation() must be used within an <I18nProvider>. " +
        "Wrap your app (or the relevant subtree) with <I18nProvider>.",
    );
  }
  return ctx;
}
