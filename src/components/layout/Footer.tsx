import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Linkedin, Mail, Phone } from "lucide-react";
import { useTranslation } from "@/i18n";
import Logo from "@/components/ui/Logo";

const NAV_LINKS = [
  { labelKey: "nav.home", to: "/" },
  { labelKey: "nav.services", to: "/servicos" },
  { labelKey: "nav.portfolio", to: "/portfolio" },
  { labelKey: "nav.about", to: "/sobre" },
  { labelKey: "nav.contact", to: "/contato" },
];

const SERVICE_LINKS = [
  { label: "Animacao 2D", to: "/servicos" },
  { label: "Animacao 3D", to: "/servicos" },
  { label: "Motion Graphics", to: "/servicos" },
  { label: "Stop Motion", to: "/servicos" },
  { label: "Efeitos Visuais", to: "/servicos" },
  { label: "Animacao de Personagens", to: "/servicos" },
];

const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Newsletter submission placeholder
    setEmail("");
  }

  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + description + social */}
          <div className="space-y-6">
            <Logo variant="full" />
            <p className="text-sm leading-relaxed text-text-muted">
              Estudio de cinema e animacao brasileiro. Transformamos historias em
              experiencias visuais extraordinarias.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="mb-4 font-display text-lg text-heading">
              {t("nav.home")}
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ labelKey, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-text-muted transition-colors hover:text-primary"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="mb-4 font-display text-lg text-heading">
              {t("nav.services")}
            </h3>
            <ul className="space-y-2">
              {SERVICE_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-text-muted transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter + Contact */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 font-display text-lg text-heading">
                {t("footer.newsletter.title")}
              </h3>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.newsletter.placeholder")}
                  required
                  className="flex-1 rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  {t("footer.newsletter.subscribe")}
                </button>
              </form>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:contato@magicmoveanimation.com.br"
                className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                contato@magicmoveanimation.com.br
              </a>
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                +55 (11) 99999-9999
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-text-muted sm:flex-row sm:px-6 lg:px-8">
          <span>&copy; 2026 Magic Move Animation Brasil</span>
          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
