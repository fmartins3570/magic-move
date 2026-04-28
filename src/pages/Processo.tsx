import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/motion/FadeIn";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import {
  ClipboardList,
  Lightbulb,
  LayoutPanelLeft,
  Settings,
  Play,
  Wand2,
  Rocket,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Process steps data                                                 */
/* ------------------------------------------------------------------ */

interface Step {
  number: number;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: ClipboardList,
    titleKey: "process.steps.briefing.title",
    descKey: "process.steps.briefing.desc",
  },
  {
    number: 2,
    icon: Lightbulb,
    titleKey: "process.steps.conceito.title",
    descKey: "process.steps.conceito.desc",
  },
  {
    number: 3,
    icon: LayoutPanelLeft,
    titleKey: "process.steps.storyboard.title",
    descKey: "process.steps.storyboard.desc",
  },
  {
    number: 4,
    icon: Settings,
    titleKey: "process.steps.producao.title",
    descKey: "process.steps.producao.desc",
  },
  {
    number: 5,
    icon: Play,
    titleKey: "process.steps.animacao.title",
    descKey: "process.steps.animacao.desc",
  },
  {
    number: 6,
    icon: Wand2,
    titleKey: "process.steps.posproducao.title",
    descKey: "process.steps.posproducao.desc",
  },
  {
    number: 7,
    icon: Rocket,
    titleKey: "process.steps.entrega.title",
    descKey: "process.steps.entrega.desc",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Processo() {
  const { t } = useTranslation();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `${t("process.title")} | Magic Move Animation Brasil`;
  }, [t]);

  // Scroll progress for the red line fill
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-base pt-32 pb-20">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <SectionTitle
            title={t("process.title")}
            subtitle={t("process.subtitle")}
          />
          <FadeIn delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted">
              Do primeiro briefing a entrega final, cada etapa do nosso processo e pensada para garantir excelencia e transparencia.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div ref={timelineRef} className="relative">
            {/* ── Center vertical line (desktop) ── */}
            <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2">
              {/* Red fill on scroll */}
              <motion.div
                className="w-full origin-top bg-primary"
                style={{ height: lineHeight }}
              />
            </div>

            {/* ── Steps ── */}
            <div className="space-y-12 md:space-y-20">
              {steps.map((step, idx) => {
                const isLeft = idx % 2 === 0;
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative flex items-start md:items-center"
                  >
                    {/* ── Desktop: alternating layout ── */}

                    {/* Left content (desktop) */}
                    <div
                      className={cn(
                        "hidden w-5/12 md:block",
                        isLeft ? "" : "order-2"
                      )}
                    >
                      <FadeIn direction={isLeft ? "left" : "right"} delay={0.1}>
                        <div
                          className={cn(
                            "rounded-xl border border-border bg-surface-raised p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
                            isLeft ? "text-right" : "text-left"
                          )}
                        >
                          <div
                            className={cn(
                              "mb-3 flex items-center gap-3",
                              isLeft ? "justify-end" : "justify-start"
                            )}
                          >
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
                                isLeft ? "order-2" : ""
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-display text-2xl text-heading">
                              {t(step.titleKey)}
                            </h3>
                          </div>
                          <p className="leading-relaxed text-text-muted">
                            {t(step.descKey)}
                          </p>
                        </div>
                      </FadeIn>
                    </div>

                    {/* Center circle (desktop) */}
                    <div className="absolute left-4 z-10 md:static md:flex md:w-2/12 md:justify-center">
                      <motion.div
                        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-base font-display text-sm text-heading shadow-lg shadow-primary/20"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: idx * 0.08,
                        }}
                      >
                        {step.number}
                      </motion.div>
                    </div>

                    {/* Right content (desktop) — empty for left-aligned steps */}
                    <div
                      className={cn(
                        "hidden w-5/12 md:block",
                        isLeft ? "order-3" : "order-1"
                      )}
                    />

                    {/* ── Mobile: all on the right ── */}
                    <div className="ml-12 block md:hidden">
                      <FadeIn direction="right" delay={0.1}>
                        <div className="rounded-xl border border-border bg-surface-raised p-5 transition-all duration-300 hover:border-primary/30">
                          <div className="mb-2 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <Icon className="h-4 w-4" />
                            </div>
                            <h3 className="font-display text-xl text-heading">
                              {t(step.titleKey)}
                            </h3>
                          </div>
                          <p className="text-sm leading-relaxed text-text-muted">
                            {t(step.descKey)}
                          </p>
                        </div>
                      </FadeIn>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-base py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <FadeIn>
            <h2 className="mb-4 font-display text-3xl text-heading md:text-4xl">
              Pronto para comecar?
            </h2>
            <p className="mb-8 text-lg text-text-muted">
              O primeiro passo e simples: conte-nos sobre a sua ideia. Nos cuidamos do resto.
            </p>
            <Button href="/contato" size="lg">
              {t("contact.title")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
