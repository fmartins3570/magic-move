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

// ---------------------------------------------------------------------------
// Animated gradient orbs — large blurred circles that drift with parallax
// ---------------------------------------------------------------------------

function GradientOrb({
  color,
  size,
  initialX,
  initialY,
  duration,
}: {
  color: string;
  size: number;
  initialX: string;
  initialY: string;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none blur-[120px]"
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        background: color,
      }}
      animate={{
        x: [0, 50, -30, 20, 0],
        y: [0, -40, 20, -60, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// SVG red accent line — draws from left to right
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Scroll indicator — a growing line + "scroll" text
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// HeroShowreel — Cinematic full-screen opening experience
// ---------------------------------------------------------------------------

export default function HeroShowreel() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax zoom-out effect on scroll
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  // Smooth spring for title transforms
  const smoothScale = useSpring(titleScale, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(contentY, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-base"
    >
      {/* ----- Animated gradient orbs background ----- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <GradientOrb
          color="rgba(220, 38, 38, 0.08)"
          size={800}
          initialX="-10%"
          initialY="-20%"
          duration={25}
        />
        <GradientOrb
          color="rgba(220, 38, 38, 0.05)"
          size={600}
          initialX="60%"
          initialY="50%"
          duration={30}
        />
        <GradientOrb
          color="rgba(120, 20, 20, 0.06)"
          size={500}
          initialX="30%"
          initialY="70%"
          duration={22}
        />
        <GradientOrb
          color="rgba(255, 255, 255, 0.02)"
          size={700}
          initialX="70%"
          initialY="-10%"
          duration={28}
        />
      </div>

      {/* ----- Dark vignette overlay ----- */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.4)_60%,rgba(10,10,10,0.9)_100%)] pointer-events-none" />

      {/* ----- Red accent line ----- */}
      <RedAccentLine />

      {/* ----- Main content ----- */}
      <motion.div
        className="relative z-[2] flex flex-col items-center px-4 text-center w-full"
        style={{
          scale: smoothScale,
          opacity: titleOpacity,
          y: smoothY,
        }}
      >
        {/* MAGIC MOVE — massive character-by-character reveal */}
        <div className="mb-2">
          <TextSplitReveal
            text="MAGIC MOVE"
            className="text-[12vw] md:text-[15vw] font-display leading-[0.85] text-heading tracking-tight"
            delay={0.3}
            staggerDelay={0.06}
          />
        </div>

        {/* ANIMATION STUDIO — tracked-out subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] }}
        >
          <span className="font-body text-xs md:text-sm uppercase tracking-[0.5em] md:tracking-[0.8em] text-text-muted">
            Animation Studio
          </span>
        </motion.div>

        {/* CTA buttons — slide up from below */}
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

      {/* ----- Scroll indicator ----- */}
      <ScrollIndicator />

      {/* ----- Film grain texture overlay ----- */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}
