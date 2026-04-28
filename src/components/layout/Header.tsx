import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import { useScrolled } from "@/hooks/useScrollReveal";
import Logo from "@/components/ui/Logo";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import MobileMenu from "./MobileMenu";

interface NavItem {
  labelKey: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.home", to: "/" },
  { labelKey: "nav.services", to: "/servicos" },
  { labelKey: "nav.portfolio", to: "/portfolio" },
  { labelKey: "nav.about", to: "/sobre" },
  { labelKey: "nav.contact", to: "/contato" },
];

export default function Header() {
  const { t } = useTranslation();
  const scrolled = useScrolled(50);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-base/90 shadow-lg shadow-black/20 backdrop-blur-lg"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo: full on desktop, icon on mobile */}
          <div className="shrink-0">
            <span className="hidden sm:block">
              <Logo variant="full" />
            </span>
            <span className="sm:hidden">
              <Logo variant="icon" />
            </span>
          </div>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map(({ labelKey, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-text-muted hover:text-text",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {t(labelKey)}
                      {isActive && (
                        <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right side: language switcher + CTA + mobile menu */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            <Link
              to="/contato"
              className="hidden rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:inline-block"
            >
              {t("nav.budget")}
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface hover:text-text lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
