import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import TextSplitReveal from "@/components/motion/TextSplitReveal";
import Tilt3DCard from "@/components/motion/Tilt3DCard";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Stats data
// ---------------------------------------------------------------------------

interface StatCard {
  value: string;
  label: string;
}

const stats: StatCard[] = [
  { value: "200+", label: "Projetos Entregues" },
  { value: "8+", label: "Anos de Experiencia" },
  { value: "25+", label: "Artistas & Animadores" },
  { value: "15+", label: "Premios Recebidos" },
];

// ---------------------------------------------------------------------------
// AnimatedStatCard — individual stat card with stagger animation
// ---------------------------------------------------------------------------

function AnimatedStatCard({
  stat,
  index,
}: {
  stat: StatCard;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
    >
      <Tilt3DCard className="h-full">
        <div
          className={cn(
            "rounded-xl bg-surface p-8 md:p-10 border border-white/[0.04]",
            "transition-all duration-500 hover:border-primary/20 hover:bg-surface-raised",
          )}
        >
          <span className="block font-display text-5xl md:text-6xl text-primary leading-none">
            {stat.value}
          </span>
          <span className="mt-3 block font-body text-sm md:text-base text-text-muted">
            {stat.label}
          </span>
        </div>
      </Tilt3DCard>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// AboutTeaser — Split screen with parallax stats
// ---------------------------------------------------------------------------

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [50, -30]);
  const rightY = useTransform(scrollYProgress, [0, 1], [80, -50]);
  const accentY = useTransform(scrollYProgress, [0, 1], [100, -60]);

  return (
    <section ref={sectionRef} className="relative bg-base overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 min-h-screen items-start py-24 md:py-32">
          {/* ----- Left half: sticky manifesto with parallax ----- */}
          <motion.div className="lg:sticky lg:top-32 lg:self-start" style={{ y: leftY }}>
            {/* Manifesto headline */}
            <div className="mb-8">
              <TextSplitReveal
                text="Nao somos apenas um estudio."
                className="text-3xl md:text-4xl lg:text-5xl font-display text-heading leading-tight"
                delay={0.1}
                staggerDelay={0.03}
              />
            </div>

            {/* Extended manifesto */}
            <motion.p
              className="font-body text-lg md:text-xl text-text-muted leading-relaxed max-w-md mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.6,
                duration: 0.7,
                ease: [0.23, 0.86, 0.39, 0.96],
              }}
            >
              Somos um universo criativo onde tecnologia, arte e emocao se
              encontram. Cada projeto e uma oportunidade de criar algo que nunca
              existiu antes.
            </motion.p>

            {/* Large red accent number with deeper parallax */}
            <motion.div
              className="flex items-end gap-4"
              style={{ y: accentY }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.9,
                duration: 0.8,
                ease: [0.23, 0.86, 0.39, 0.96],
              }}
            >
              <span className="font-display text-[120px] md:text-[160px] text-primary leading-[0.8] tracking-tight">
                8+
              </span>
              <span className="font-body text-sm md:text-base text-text-muted mb-4 leading-tight">
                anos criando<br />mundos impossiveis
              </span>
            </motion.div>

            {/* Decorative red line */}
            <motion.div
              className="mt-8 h-[2px] w-32 bg-primary origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 1.2,
                duration: 0.8,
                ease: [0.23, 0.86, 0.39, 0.96],
              }}
            />
          </motion.div>

          {/* ----- Right half: scrolling stat cards with parallax ----- */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ y: rightY }}>
            {stats.map((stat, index) => (
              <AnimatedStatCard key={stat.label} stat={stat} index={index} />
            ))}

            {/* Extra content card for scroll distance */}
            <motion.div
              className="sm:col-span-2 rounded-xl bg-surface/50 border border-white/[0.04] p-8 md:p-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.23, 0.86, 0.39, 0.96],
              }}
            >
              <p className="font-body text-base md:text-lg text-text-muted leading-relaxed">
                Do conceito a entrega final, nossa equipe multidisciplinar une
                diretores, animadores, compositores e artistas visuais para
                criar experiencias que emocionam e inspiram.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/[0.06]" />
                <span className="font-display text-sm text-primary tracking-widest uppercase">
                  Magic Move
                </span>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
