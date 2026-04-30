import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextSplitReveal from "@/components/motion/TextSplitReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import { WHATSAPP_URL } from "@/lib/constants";

function AnimatedCircle({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <motion.svg
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] pointer-events-none z-0"
      viewBox="0 0 200 200"
      style={{ opacity }}
    >
      <motion.circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="#DC2626"
        strokeWidth="0.5"
        strokeLinecap="round"
        style={{ pathLength }}
      />
    </motion.svg>
  );
}

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [60, -30]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [80, -20]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [120, -60]);
  const watermarkScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-base py-40 md:py-56 overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Main headline with parallax */}
        <motion.div className="mb-6" style={{ y: headlineY }}>
          <TextSplitReveal
            text="TEM UM PROJETO EM MENTE?"
            className="text-[7vw] md:text-[5vw] lg:text-[4.5vw] font-display text-heading leading-[0.95] tracking-tight"
            delay={0.1}
            staggerDelay={0.04}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-body text-lg md:text-xl text-text-muted mb-16 md:mb-20"
          style={{ y: headlineY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Vamos transformar sua ideia em realidade
        </motion.p>

        {/* CTA button with animated circle and parallax */}
        <motion.div
          className="relative inline-block"
          style={{ y: buttonY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <AnimatedCircle scrollYProgress={scrollYProgress} />
          <div className="relative z-10">
            <MagneticButton>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 md:px-14 md:py-6 font-display text-xl md:text-2xl text-white shadow-2xl shadow-primary/30 transition-colors duration-300 hover:bg-red-700"
              >
                Iniciar Projeto
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* MAGIC MOVE watermark with deep parallax */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden"
        style={{ y: watermarkY, scale: watermarkScale }}
      >
        <motion.span
          className="font-display text-[20vw] md:text-[15vw] text-white/[0.03] leading-none select-none translate-y-[30%]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          MAGIC MOVE
        </motion.span>
      </motion.div>
    </section>
  );
}
