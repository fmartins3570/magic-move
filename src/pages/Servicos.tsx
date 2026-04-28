import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/constants";
import FadeIn from "@/components/motion/FadeIn";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import {
  Brush,
  Box,
  Zap,
  Hand,
  Sparkles,
  User,
  Check,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Inline service data                                                */
/* ------------------------------------------------------------------ */

interface ServiceDetail {
  key: string;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  deliverables: string[];
  ctaLabel: string;
}

const services: ServiceDetail[] = [
  {
    key: "2d",
    icon: Brush,
    titleKey: "services.items.2d.title",
    descKey: "services.items.2d.desc",
    deliverables: ["Storyboard", "Character Design", "Backgrounds", "Frame-by-frame Animation"],
    ctaLabel: "Animacao 2D",
  },
  {
    key: "3d",
    icon: Box,
    titleKey: "services.items.3d.title",
    descKey: "services.items.3d.desc",
    deliverables: ["Modeling", "Texturing", "Rigging", "Rendering"],
    ctaLabel: "Animacao 3D",
  },
  {
    key: "motion",
    icon: Zap,
    titleKey: "services.items.motion.title",
    descKey: "services.items.motion.desc",
    deliverables: ["Explainer Videos", "Logo Animation", "Title Sequences", "Social Media Content"],
    ctaLabel: "Motion Graphics",
  },
  {
    key: "stopmotion",
    icon: Hand,
    titleKey: "services.items.stopmotion.title",
    descKey: "services.items.stopmotion.desc",
    deliverables: ["Set Design", "Character Fabrication", "Frame Capture", "Post-production"],
    ctaLabel: "Stop Motion",
  },
  {
    key: "vfx",
    icon: Sparkles,
    titleKey: "services.items.vfx.title",
    descKey: "services.items.vfx.desc",
    deliverables: ["Compositing", "CGI Integration", "Particle Effects", "Color Grading"],
    ctaLabel: "Efeitos Visuais (VFX)",
  },
  {
    key: "character",
    icon: User,
    titleKey: "services.items.character.title",
    descKey: "services.items.character.desc",
    deliverables: ["Character Concept", "Motion Capture", "Facial Animation", "Voice Sync"],
    ctaLabel: "Animacao de Personagens",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Servicos() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t("services.title")} | Magic Move Animation Brasil`;
  }, [t]);

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-base pt-32 pb-20">
        {/* Red accent line */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <SectionTitle
            title={t("services.title")}
            subtitle={t("services.subtitle")}
          />
          <FadeIn delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted">
              {t("services.items.2d.desc").split(",")[0]}. {t("about.mission").split(",")[0]}.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Service Detail Sections ── */}
      {services.map((service, idx) => {
        const isOdd = idx % 2 === 0; // 0-indexed: first is "odd" layout
        const Icon = service.icon;
        const bgClass = idx % 2 === 0 ? "bg-base" : "bg-surface";

        return (
          <section
            key={service.key}
            className={cn("relative border-b border-border py-20 md:py-28", bgClass)}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div
                className={cn(
                  "flex flex-col items-center gap-12 md:gap-16 lg:flex-row",
                  !isOdd && "lg:flex-row-reverse"
                )}
              >
                {/* ── Icon / Visual ── */}
                <FadeIn
                  direction={isOdd ? "left" : "right"}
                  className="flex w-full items-center justify-center lg:w-5/12"
                >
                  <motion.div
                    className="relative flex h-48 w-48 items-center justify-center rounded-2xl border border-border bg-surface-raised md:h-64 md:w-64"
                    whileHover={{ rotate: 2, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {/* Glow ring */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute -inset-4 rounded-3xl border border-primary/10" />
                    <Icon className="h-20 w-20 text-primary md:h-24 md:w-24" strokeWidth={1.2} />
                  </motion.div>
                </FadeIn>

                {/* ── Content ── */}
                <FadeIn
                  direction={isOdd ? "right" : "left"}
                  delay={0.15}
                  className="w-full lg:w-7/12"
                >
                  <h3 className="mb-4 font-display text-3xl text-heading md:text-4xl">
                    {t(service.titleKey)}
                  </h3>

                  <p className="mb-8 max-w-xl leading-relaxed text-text-muted">
                    {t(service.descKey)}
                  </p>

                  {/* Deliverables */}
                  <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-text"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Ola! Tenho interesse em ${service.ctaLabel}.`)}`}
                    size="lg"
                  >
                    {t("nav.budget")} — {service.ctaLabel}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </FadeIn>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Bottom CTA ── */}
      <section className="bg-base py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <FadeIn>
            <h2 className="mb-4 font-display text-3xl text-heading md:text-4xl">
              {t("services.title").includes("Servico")
                ? "Nao encontrou o que precisa?"
                : "Nao encontrou o que precisa?"}
            </h2>
            <p className="mb-8 text-lg text-text-muted">
              Entre em contato e conte-nos sobre o seu projeto. Criamos solucoes sob medida para cada cliente.
            </p>
            <Button href="/contato" variant="secondary" size="lg">
              {t("contact.title")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
