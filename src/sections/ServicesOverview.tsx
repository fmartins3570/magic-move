import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCursor } from "@/components/ui/CustomCursor";
import TextSplitReveal from "@/components/motion/TextSplitReveal";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Service definitions
// ---------------------------------------------------------------------------

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    number: "01",
    name: "Animacao 2D",
    description:
      "Narrativas visuais com tecnicas classicas e contemporaneas. Cada quadro e uma obra de arte desenhada com intencao e emocao.",
  },
  {
    number: "02",
    name: "Animacao 3D",
    description:
      "Mundos tridimensionais imersivos com renderizacao cinematografica. Personagens e cenarios que transcendem a tela.",
  },
  {
    number: "03",
    name: "Motion Graphics",
    description:
      "Design em movimento que comunica com clareza e impacto. Graficos que transformam dados e ideias em experiencias visuais.",
  },
  {
    number: "04",
    name: "Stop Motion",
    description:
      "A magia do movimento quadro a quadro. Texturas reais e imperfeicoes que trazem uma autenticidade unica.",
  },
  {
    number: "05",
    name: "Efeitos Visuais",
    description:
      "VFX que expande os limites do possivel. Composicao, simulacoes e efeitos que integram perfeitamente ao live-action.",
  },
  {
    number: "06",
    name: "Animacao de Personagens",
    description:
      "Personagens com alma. Character design, rigging e animacao que criam conexao emocional com o publico.",
  },
  {
    number: "07",
    name: "Series",
    description:
      "Producao completa de series animadas. Do formato a temporadas inteiras para TV e plataformas de streaming.",
  },
];

// ---------------------------------------------------------------------------
// ServiceRow — individual service row with hover interactions
// ---------------------------------------------------------------------------

function ServiceRow({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorType } = useCursor();
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={rowRef}
      className="group relative border-b border-white/[0.06]"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorType("link");
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorType("default");
      }}
    >
      {/* Hover background shift */}
      <motion.div
        className="absolute inset-0 bg-white/[0.02]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex items-center justify-between px-4 md:px-8 py-8 md:py-10 cursor-pointer">
        {/* Left: Number */}
        <div className="flex items-center gap-6 md:gap-12 flex-1 min-w-0">
          <motion.span
            className={cn(
              "text-[8vw] md:text-[6vw] lg:text-[5vw] font-display leading-none transition-all duration-500 select-none",
              "flex-shrink-0",
            )}
            animate={{
              color: isHovered ? "#DC2626" : "rgba(241, 245, 249, 0.06)",
            }}
            transition={{ duration: 0.4 }}
            style={{
              WebkitTextStroke: isHovered ? "0px" : "1px rgba(241, 245, 249, 0.08)",
              WebkitTextFillColor: isHovered ? "#DC2626" : "transparent",
              transition: "all 0.4s ease",
            }}
          >
            {service.number}
          </motion.span>

          {/* Center: Name + Description on hover */}
          <div className="flex flex-col min-w-0">
            <motion.h3
              className="font-display text-2xl md:text-4xl lg:text-5xl text-heading leading-tight"
              animate={{
                x: isHovered ? 16 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.23, 0.86, 0.39, 0.96] }}
            >
              {service.name}
            </motion.h3>

            {/* Description — slides in on hover */}
            <motion.p
              className="font-body text-sm md:text-base text-text-muted max-w-xl overflow-hidden"
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{
                height: isHovered ? "auto" : 0,
                opacity: isHovered ? 1 : 0,
                marginTop: isHovered ? 8 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.23, 0.86, 0.39, 0.96] }}
            >
              {service.description}
            </motion.p>
          </div>
        </div>

        {/* Right: Arrow */}
        <motion.div
          className="flex-shrink-0 ml-4"
          animate={{
            x: isHovered ? 0 : -8,
            opacity: isHovered ? 1 : 0.3,
            rotate: isHovered ? 0 : -45,
          }}
          transition={{ duration: 0.4, ease: [0.23, 0.86, 0.39, 0.96] }}
        >
          <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8 text-heading" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ServicesOverview — Interactive vertical list experience
// ---------------------------------------------------------------------------

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const lineY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  return (
    <section ref={sectionRef} className="relative bg-base py-24 md:py-32 overflow-hidden">
      {/* Section title with parallax */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <motion.div style={{ y: titleY }}>
          <TextSplitReveal
            text="O QUE FAZEMOS"
            className="text-5xl md:text-7xl lg:text-8xl font-display text-heading leading-none"
            delay={0.1}
            staggerDelay={0.04}
          />
        </motion.div>
        <motion.div
          className="mt-4 h-[2px] w-20 bg-primary origin-left"
          style={{ y: lineY }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 0.86, 0.39, 0.96] }}
        />
      </div>

      {/* Service rows */}
      <div className="mx-auto max-w-7xl">
        <div className="border-t border-white/[0.06]" />
        {services.map((service, index) => (
          <ServiceRow key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
