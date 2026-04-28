import { motion } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursor";
import TextSplitReveal from "@/components/motion/TextSplitReveal";
import HorizontalScroll from "@/components/motion/HorizontalScroll";
import Tilt3DCard from "@/components/motion/Tilt3DCard";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Project data
// ---------------------------------------------------------------------------

interface Project {
  title: string;
  category: string;
  year: string;
  gradient: string;
}

const projects: Project[] = [
  {
    title: "O Peregrino",
    category: "Longa-metragem",
    year: "2026",
    gradient: "from-red-950 via-stone-900 to-[#0A0A0A]",
  },
  {
    title: "Universo Encantado",
    category: "Serie",
    year: "2025",
    gradient: "from-purple-950 via-stone-900 to-[#0A0A0A]",
  },
  {
    title: "Rhythm & Soul",
    category: "Trilha Sonora",
    year: "2025",
    gradient: "from-amber-950 via-stone-900 to-[#0A0A0A]",
  },
  {
    title: "Tech Dreams",
    category: "Motion Graphics",
    year: "2024",
    gradient: "from-cyan-950 via-stone-900 to-[#0A0A0A]",
  },
  {
    title: "Mundo Animal",
    category: "Stop Motion",
    year: "2024",
    gradient: "from-emerald-950 via-stone-900 to-[#0A0A0A]",
  },
];

// ---------------------------------------------------------------------------
// ProjectPanel — individual project card (each is a child of HorizontalScroll)
// ---------------------------------------------------------------------------

function ProjectPanel({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const { setCursorType } = useCursor();

  return (
    <div
      className="flex items-center justify-center gap-8 w-full h-full px-8 md:px-16"
      onMouseEnter={() => setCursorType("project")}
      onMouseLeave={() => setCursorType("default")}
    >
      <Tilt3DCard className="w-[85vw] md:w-[75vw] lg:w-[65vw] h-[65vh] md:h-[75vh]">
        <div
          className={cn(
            "relative w-full h-full rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br",
            project.gradient,
          )}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Dark overlay at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Category badge — top left */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <span className="inline-block rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 font-body text-xs md:text-sm text-text-muted">
              {project.category}
            </span>
          </div>

          {/* Year — top right */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8">
            <span className="font-body text-xs md:text-sm text-text-muted/60">
              {project.year}
            </span>
          </div>

          {/* Project count — center top */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 md:top-8">
            <span className="font-display text-sm md:text-base text-text-muted/30 tracking-widest">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Project title — huge, bottom-left positioned */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
            <h3 className="font-display text-[10vw] md:text-[6vw] lg:text-[5vw] text-heading leading-[0.9] tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>
      </Tilt3DCard>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FeaturedProjects — Horizontal scrolling showcase
// ---------------------------------------------------------------------------

export default function FeaturedProjects() {
  return (
    <section className="relative bg-base overflow-hidden">
      {/* Section title */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12 md:pb-20">
        <TextSplitReveal
          text="NOSSOS PROJETOS"
          className="text-5xl md:text-7xl lg:text-8xl font-display text-heading leading-none"
          delay={0.1}
          staggerDelay={0.03}
        />
        <motion.p
          className="mt-6 font-body text-base md:text-lg text-text-muted max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Cada projeto e uma jornada unica. Explore nosso portfolio de cinema,
          animacao e motion design.
        </motion.p>
      </div>

      {/* Horizontal scroll area — each child becomes a full-width panel */}
      <HorizontalScroll className="pb-0">
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </HorizontalScroll>
    </section>
  );
}
