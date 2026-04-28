import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { COMPANY_NAME } from "@/lib/constants";
import FadeIn from "@/components/motion/FadeIn";
import StaggerChildren from "@/components/motion/StaggerChildren";
import SectionTitle from "@/components/ui/SectionTitle";
import { Target, Eye, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ValueCard {
  icon: LucideIcon;
  titleKey: string;
  textKey: string;
}

const values: ValueCard[] = [
  {
    icon: Target,
    titleKey: "Missao",
    textKey: "about.mission",
  },
  {
    icon: Eye,
    titleKey: "Visao",
    textKey: "about.vision",
  },
  {
    icon: Heart,
    titleKey: "Valores",
    textKey: "values",
  },
];

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  color: string;
}

const team: TeamMember[] = [
  { name: "Deividi Carlos", role: "CEO / Diretor / Produtor", initials: "DC", color: "bg-red-600" },
  { name: "Ana Silva", role: "Diretora de Arte", initials: "AS", color: "bg-purple-600" },
  { name: "Rafael Santos", role: "Lead Animator 3D", initials: "RS", color: "bg-blue-600" },
  { name: "Marina Costa", role: "Character Designer", initials: "MC", color: "bg-emerald-600" },
  { name: "Lucas Oliveira", role: "Compositor VFX", initials: "LO", color: "bg-amber-600" },
  { name: "Julia Mendes", role: "Sound Designer", initials: "JM", color: "bg-pink-600" },
];

const tools = [
  "Maya",
  "Blender",
  "ZBrush",
  "Houdini",
  "Nuke",
  "After Effects",
  "Premiere",
  "DaVinci",
  "Pro Tools",
  "Logic Pro",
  "Photoshop",
  "Illustrator",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Sobre() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t("about.title")} | Magic Move Animation Brasil`;
  }, [t]);

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
            title={t("about.title")}
            subtitle={t("about.subtitle")}
          />
          <FadeIn delay={0.2}>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-muted">
              {t("about.description")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            {/* Left — Story text */}
            <FadeIn direction="left" className="w-full lg:w-7/12">
              <span className="mb-3 block font-body text-sm font-medium uppercase tracking-widest text-primary">
                Nossa Historia
              </span>
              <h2 className="mb-6 font-display text-3xl text-heading md:text-4xl lg:text-5xl">
                Onde tudo comecou
              </h2>
              <div className="space-y-4 leading-relaxed text-text-muted">
                <p>
                  Em 2017, nasceu a {COMPANY_NAME} com um sonho audacioso: criar um estudio de animacao de classe mundial no coracao do Brasil. O que comecou como um pequeno coletivo de artistas apaixonados se transformou em um dos estudios mais reconhecidos do mercado nacional.
                </p>
                <p>
                  Nossa visao sempre foi clara — unir a riqueza criativa brasileira com as mais avancadas tecnologias de producao audiovisual. Cada projeto que realizamos carrega essa essencia: historias que emocionam, visuais que impressionam e resultados que transformam.
                </p>
                <p>
                  Hoje, com mais de 200 projetos entregues e uma equipe de profissionais dedicados, continuamos fieis a nossa missao de transformar ideias em experiencias visuais extraordinarias.
                </p>
              </div>
            </FadeIn>

            {/* Right — Visual card with year */}
            <FadeIn direction="right" delay={0.2} className="w-full lg:w-5/12">
              <div className="relative mx-auto max-w-sm">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-raised p-10 md:p-12">
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 h-24 w-24 rounded-full border border-primary/10" />
                  <div className="absolute bottom-6 left-6 h-16 w-16 rounded-full border border-primary/5" />
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-primary/50 to-transparent" />

                  <div className="relative text-center">
                    <span className="block font-body text-sm font-medium uppercase tracking-widest text-primary">
                      Fundado em
                    </span>
                    <span className="mt-2 block font-display text-8xl text-heading md:text-9xl">
                      2017
                    </span>
                    <span className="mt-4 block text-text-muted">
                      Sao Paulo, Brasil
                    </span>
                  </div>

                  {/* Stats bar */}
                  <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-8">
                    <div className="text-center">
                      <span className="block font-display text-2xl text-heading">
                        {t("about.stats.projects.value")}
                      </span>
                      <span className="text-xs text-text-muted">
                        {t("about.stats.projects.label")}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="block font-display text-2xl text-heading">
                        {t("about.stats.awards.value")}
                      </span>
                      <span className="text-xs text-text-muted">
                        {t("about.stats.awards.label")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Values ── */}
      <section className="bg-base py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="grid gap-6 md:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;
              const text =
                item.textKey === "values"
                  ? "Excelencia, Inovacao, Paixao, Colaboracao e Integridade. Esses sao os pilares que guiam cada decisao e cada frame que produzimos."
                  : t(item.textKey);

              return (
                <div
                  key={item.titleKey}
                  className="group rounded-xl border border-border bg-surface-raised p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 font-display text-2xl text-heading">
                    {item.titleKey}
                  </h3>
                  <p className="leading-relaxed text-text-muted">{text}</p>
                </div>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Nosso Elenco" subtitle="A Equipe" />

          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((member) => (
              <motion.div
                key={member.name}
                className="group rounded-xl border border-border bg-surface-raised p-6 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg",
                    member.color
                  )}
                >
                  {member.initials}
                </div>

                <h3 className="mb-1 font-display text-xl text-heading">
                  {member.name}
                </h3>
                <p className="text-sm text-text-muted">{member.role}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Tools & Technology ── */}
      <section className="bg-base py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Nossas Ferramentas" subtitle="Tecnologia" />

          <FadeIn>
            <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-border bg-surface-raised px-5 py-2.5 text-sm font-medium text-text transition-all duration-300 hover:border-primary/30 hover:text-primary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
