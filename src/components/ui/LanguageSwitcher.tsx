import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation, type Locale } from "@/i18n";

const locales: { code: Locale; label: string }[] = [
  { code: "pt-BR", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-1">
      {locales.map(({ code, label }) => {
        const isActive = locale === code;

        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={cn(
              "relative rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200",
              isActive ? "text-white" : "text-text-muted hover:text-white",
            )}
            aria-label={`Switch language to ${label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {isActive && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
