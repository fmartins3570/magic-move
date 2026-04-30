import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursor";
import TextSplitReveal from "@/components/motion/TextSplitReveal";
import Tilt3DCard from "@/components/motion/Tilt3DCard";
import { cn } from "@/lib/utils";

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

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const { setCursorType } = useCursor();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      className="snap-center shrink-0 flex items-center justify-center px-4 md:px-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      onMouseEnter={() => setCursorType("project")}
      onMouseLeave={() => setCursorType("default")}
    >
      <Tilt3DCard className="w-[80vw] md:w-[60vw] lg:w-[50vw] h-[55vh] md:h-[65vh]">
        <div
          className={cn(
            "relative w-full h-full rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br",
            project.gradient,
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <span className="inline-block rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 font-body text-xs md:text-sm text-text-muted">
              {project.category}
            </span>
          </div>

          <div className="absolute top-6 right-6 md:top-8 md:right-8">
            <span className="font-body text-xs md:text-sm text-text-muted/60">
              {project.year}
            </span>
          </div>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 md:top-8">
            <span className="font-display text-sm md:text-base text-text-muted/30 tracking-widest">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
            <h3 className="font-display text-[10vw] md:text-[5vw] lg:text-[4vw] text-heading leading-[0.9] tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>
      </Tilt3DCard>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const titleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [50, -15]);

  return (
    <section className="relative bg-base overflow-hidden py-24 md:py-32">
      {/* Section title with parallax */}
      <div ref={titleRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
        <motion.div style={{ y: titleY }}>
          <TextSplitReveal
            text="NOSSOS PROJETOS"
            className="text-5xl md:text-7xl lg:text-8xl font-display text-heading leading-none"
            delay={0.1}
            staggerDelay={0.03}
          />
        </motion.div>
        <motion.p
          className="mt-6 font-body text-base md:text-lg text-text-muted max-w-lg"
          style={{ y: subtitleY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Cada projeto e uma jornada unica. Explore nosso portfolio de cinema,
          animacao e motion design.
        </motion.p>
      </div>

      {/* Horizontal scroll with CSS snap — no extra vertical space */}
      <div
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Left spacer */}
        <div className="shrink-0 w-4 md:w-8" />
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
        {/* Right spacer */}
        <div className="shrink-0 w-4 md:w-8" />
      </div>
    </section>
  );
}
