import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/motion/FadeIn";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { X, Lock, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Project data                                                       */
/* ------------------------------------------------------------------ */

interface Project {
  id: number;
  title: string;
  category: string;
  filterKey: string;
  gradient: string;
  description: string;
  tools: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "O Peregrino",
    category: "3D",
    filterKey: "3D",
    gradient: "from-red-900 to-gray-900",
    description:
      "Longa-metragem de animacao 3D que acompanha a jornada epica de um viajante solitario atraves de paisagens fantasticas. Producao completa incluindo modelagem, rigging, animacao e renderizacao cinematografica.",
    tools: ["Maya", "ZBrush", "Houdini", "Nuke", "DaVinci Resolve"],
  },
  {
    id: 2,
    title: "Universo Encantado",
    category: "2D",
    filterKey: "2D",
    gradient: "from-purple-900 to-gray-900",
    description:
      "Serie animada 2D para plataforma de streaming, com 12 episodios de 22 minutos. Estilo visual unico inspirado em aquarelas brasileiras com narrativa envolvente para todas as idades.",
    tools: ["Toon Boom Harmony", "Photoshop", "After Effects", "Pro Tools"],
  },
  {
    id: 3,
    title: "Rhythm & Soul",
    category: "Motion Graphics",
    filterKey: "Motion Graphics",
    gradient: "from-blue-900 to-gray-900",
    description:
      "Campanha de motion graphics para festival de musica internacional. Identidade visual animada completa, incluindo vinhetas, transicoes, teasers para redes sociais e projecao mapeada para o palco principal.",
    tools: ["After Effects", "Cinema 4D", "Illustrator", "Premiere Pro"],
  },
  {
    id: 4,
    title: "Tech Dreams",
    category: "VFX",
    filterKey: "VFX",
    gradient: "from-green-900 to-gray-900",
    description:
      "Comercial de alto impacto para empresa de tecnologia, combinando live-action com efeitos visuais de nivel cinematografico. Integracao CGI perfeita e composicao avancada de particulas.",
    tools: ["Nuke", "Houdini", "Maya", "DaVinci Resolve", "After Effects"],
  },
  {
    id: 5,
    title: "Mundo Animal",
    category: "Stop Motion",
    filterKey: "Stop Motion",
    gradient: "from-amber-900 to-gray-900",
    description:
      "Curta-metragem em stop motion artesanal sobre a biodiversidade brasileira. Personagens e cenarios feitos a mao com materiais reciclaveis, premiado em festivais internacionais.",
    tools: ["Dragonframe", "Photoshop", "After Effects", "Logic Pro"],
  },
  {
    id: 6,
    title: "Contos da Noite",
    category: "2D",
    filterKey: "2D",
    gradient: "from-indigo-900 to-gray-900",
    description:
      "Piloto de serie animada 2D com estetica noir e narrativa adulta. Exploracao visual ousada com tecnicas de iluminacao dramatica e paleta de cores restrita para criar atmosfera unica.",
    tools: ["Toon Boom Harmony", "Photoshop", "After Effects", "Pro Tools"],
  },
  {
    id: 7,
    title: "Solar System",
    category: "3D",
    filterKey: "3D",
    gradient: "from-cyan-900 to-gray-900",
    description:
      "Experiencia educativa imersiva em 3D sobre o sistema solar para planetarios e plataformas VR. Renderizacao fotorrealista dos planetas com dados cientificos precisos da NASA.",
    tools: ["Blender", "Houdini", "Nuke", "Unity", "DaVinci Resolve"],
  },
  {
    id: 8,
    title: "Brand Motion",
    category: "Motion Graphics",
    filterKey: "Motion Graphics",
    gradient: "from-pink-900 to-gray-900",
    description:
      "Pacote completo de motion branding para startup fintech. Logo animation, sistema de icones animados, micro-interacoes para app e biblioteca de assets animados para redes sociais.",
    tools: ["After Effects", "Illustrator", "Lottie", "Figma"],
  },
];

const filterCategories = ["Todos", "2D", "3D", "Motion Graphics", "Stop Motion", "VFX"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.title = `${t("portfolio.title")} | Magic Move Animation Brasil`;
  }, [t]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const filtered =
    activeFilter === "Todos"
      ? projects
      : projects.filter((p) => p.filterKey === activeFilter);

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
            title={t("portfolio.title")}
            subtitle={t("portfolio.subtitle")}
          />
          <FadeIn delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted">
              Conhea alguns dos projetos que marcaram nossa trajetoria. Cada trabalho e uma historia unica de criatividade e dedicacao.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="sticky top-16 z-30 border-b border-border bg-base/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-4 sm:justify-center sm:px-6">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "shrink-0 cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                activeFilter === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-surface-raised text-text-muted hover:text-text"
              )}
            >
              {cat === "Todos" ? t("portfolio.filterAll") : cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="bg-base py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.23, 0.86, 0.39, 0.96] }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative cursor-pointer overflow-hidden rounded-xl"
                >
                  {/* Gradient background */}
                  <div
                    className={cn(
                      "aspect-video w-full bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
                      project.gradient
                    )}
                  >
                    {/* Decorative elements inside the gradient */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <div className="h-32 w-32 rounded-full border-2 border-white" />
                      <div className="absolute h-20 w-20 rounded-full border border-white/50" />
                    </div>
                  </div>

                  {/* Bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                      {project.category}
                    </span>
                    <h3 className="font-display text-xl text-heading md:text-2xl">
                      {project.title}
                    </h3>
                  </div>

                  {/* Hover border */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-primary/50" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <FadeIn>
              <p className="py-20 text-center text-lg text-text-muted">
                Nenhum projeto encontrado nesta categoria.
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.35, ease: [0.23, 0.86, 0.39, 0.96] }}
            >
              {/* Header gradient */}
              <div
                className={cn(
                  "relative aspect-video w-full bg-gradient-to-br",
                  selectedProject.gradient
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="h-40 w-40 rounded-full border-2 border-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <span className="mb-3 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                  {selectedProject.category}
                </span>
                <h2 className="mb-4 font-display text-3xl text-heading md:text-4xl">
                  {selectedProject.title}
                </h2>
                <p className="mb-6 leading-relaxed text-text-muted">
                  {selectedProject.description}
                </p>

                {/* Tools */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-muted">
                    Ferramentas Utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-sm text-text"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* NDA notice */}
                <div className="flex items-center gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                  <Lock className="h-5 w-5 shrink-0 text-amber-500" />
                  <p className="text-sm text-amber-200/80">
                    Projeto confidencial — detalhes sob NDA. Entre em contato para mais informacoes.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-border bg-surface py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <FadeIn>
            <h2 className="mb-4 font-display text-3xl text-heading md:text-4xl">
              Quer ver mais?
            </h2>
            <p className="mb-8 text-lg text-text-muted">
              Nosso portfolio completo e muito mais extenso. Entre em contato para conhecer projetos especificos da sua area.
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
