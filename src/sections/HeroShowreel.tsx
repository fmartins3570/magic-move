import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Play } from "lucide-react";
import TextSplitReveal from "@/components/motion/TextSplitReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import { WHATSAPP_URL } from "@/lib/constants";

function RedAccentLine() {
  return (
    <motion.svg
      className="absolute top-[55%] left-0 w-full h-[2px] z-[1] pointer-events-none"
      viewBox="0 0 1440 2"
      preserveAspectRatio="none"
    >
      <motion.line
        x1="0"
        y1="1"
        x2="1440"
        y2="1"
        stroke="#DC2626"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          delay: 1.8,
          ease: [0.23, 0.86, 0.39, 0.96],
        }}
      />
    </motion.svg>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.2, duration: 1 }}
    >
      <motion.span
        className="font-body text-[10px] uppercase tracking-[0.4em] text-text-muted"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        scroll
      </motion.span>
      <motion.div
        className="w-[1px] bg-text-muted/50 origin-top"
        initial={{ scaleY: 0, height: 60 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 3.4, duration: 1.2, ease: [0.23, 0.86, 0.39, 0.96] }}
      />
    </motion.div>
  );
}

export default function HeroShowreel() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  // Parallax layers - background moves slower, foreground faster
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const vignetteY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const smoothScale = useSpring(titleScale, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(contentY, { stiffness: 100, damping: 30 });
  const smoothOrbY = useSpring(orbY, { stiffness: 60, damping: 25 });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-base"
    >
      {/* Gradient orbs - CSS only, no framer-motion infinite loops */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: smoothOrbY }}>
        <div
          className="absolute rounded-full pointer-events-none blur-[120px] w-[700px] h-[700px] -left-[10%] -top-[20%]"
          style={{ background: "rgba(220, 38, 38, 0.07)" }}
        />
        <div
          className="absolute rounded-full pointer-events-none blur-[120px] w-[500px] h-[500px] right-[10%] bottom-[10%]"
          style={{ background: "rgba(220, 38, 38, 0.05)" }}
        />
      </motion.div>

      {/* Vignette with parallax */}
      <motion.div
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.4)_60%,rgba(10,10,10,0.9)_100%)] pointer-events-none"
        style={{ y: vignetteY }}
      />

      <RedAccentLine />

      {/* Main content - parallax zoom-out */}
      <motion.div
        className="relative z-[2] flex flex-col items-center px-4 text-center w-full"
        style={{
          scale: smoothScale,
          opacity: titleOpacity,
          y: smoothY,
        }}
      >
        <div className="mb-2">
          <TextSplitReveal
            text="MAGIC MOVE"
            className="text-[12vw] md:text-[15vw] font-display leading-[0.85] text-heading tracking-tight"
            delay={0.3}
            staggerDelay={0.06}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] }}
        >
          <span className="font-body text-xs md:text-sm uppercase tracking-[0.5em] md:tracking-[0.8em] text-text-muted">
            Animation Studio
          </span>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] }}
        >
          <MagneticButton>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-body text-base font-medium text-white shadow-lg shadow-primary/25 transition-colors duration-200 hover:bg-red-700"
            >
              Solicitar Orcamento
            </a>
          </MagneticButton>

          <MagneticButton>
            <button className="inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 font-body text-base font-medium text-white transition-colors duration-200 hover:border-white/50">
              <Play className="h-4 w-4 fill-current" />
              Assistir Showreel
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
