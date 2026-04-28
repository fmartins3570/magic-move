import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollRevealVideo from "@/components/motion/ScrollRevealVideo";

// ---------------------------------------------------------------------------
// ShowreelReveal — Video that cinematically reveals as user scrolls
// ---------------------------------------------------------------------------

export default function ShowreelReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Text above the video scales up and fades as user scrolls
  const textScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.8, 1.1, 1.4]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 0.6, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const captionOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-base"
      style={{ minHeight: "200vh" }}
    >
      {/* Sticky viewport-height container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* SHOWREEL 2026 text — scales and fades */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none"
          style={{
            scale: textScale,
            opacity: textOpacity,
            y: textY,
          }}
        >
          <h2 className="font-display text-[10vw] md:text-[8vw] text-heading/10 leading-none tracking-tight select-none whitespace-nowrap">
            SHOWREEL 2026
          </h2>
        </motion.div>

        {/* Video container with scroll-driven clip-path reveal */}
        <div className="relative z-[2] w-full max-w-6xl px-4 md:px-8">
          <ScrollRevealVideo
            poster="/images/showreel-poster.jpg"
            className="w-full rounded-xl overflow-hidden"
          />
        </div>

        {/* Brief text below the video */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 z-[3] text-center px-4"
          style={{ opacity: captionOpacity }}
        >
          <p className="font-body text-sm md:text-base text-text-muted max-w-xl mx-auto leading-relaxed">
            8 anos transformando imaginacao em realidade. Cinema, publicidade e
            entretenimento com a assinatura Magic Move.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
