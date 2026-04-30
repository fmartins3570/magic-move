import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Testimonial data
// ---------------------------------------------------------------------------

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "A Magic Move transformou completamente a nossa campanha. A qualidade da animacao superou todas as expectativas e trouxe resultados incriveis para a marca.",
    author: "Mariana Costa",
    company: "Nova Midia Digital",
  },
  {
    quote:
      "Profissionalismo e criatividade de nivel internacional. A equipe entendeu perfeitamente nossa visao e entregou um projeto que emocionou nosso publico.",
    author: "Rafael Oliveira",
    company: "Stellaris Producoes",
  },
  {
    quote:
      "Trabalhar com a Magic Move foi uma experiencia incrivel. O processo criativo e impecavel, e o resultado final superou nossos sonhos mais ambiciosos.",
    author: "Camila Santos",
    company: "Arco Iris Filmes",
  },
];

// ---------------------------------------------------------------------------
// Word-by-word stagger animation for testimonial text
// ---------------------------------------------------------------------------

function StaggeredWords({ text, animKey }: { text: string; animKey: string }) {
  const words = text.split(" ");

  return (
    <motion.p
      key={animKey}
      className="font-body text-2xl md:text-3xl lg:text-4xl text-text italic leading-relaxed max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.03,
          },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.3 },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${animKey}-${index}`}
          className="inline-block mr-[0.3em]"
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.4,
                ease: [0.23, 0.86, 0.39, 0.96],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

// ---------------------------------------------------------------------------
// TestimonialsPreview — Single large cycling testimonial
// ---------------------------------------------------------------------------

export default function TestimonialsPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const quoteScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="relative bg-base py-32 md:py-40 overflow-hidden">
      {/* Giant decorative quote mark with parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ y: quoteY, scale: quoteScale }}
      >
        <span className="font-display text-[30vw] md:text-[25vw] text-surface-raised leading-none">
          &ldquo;
        </span>
      </motion.div>

      {/* Content with parallax */}
      <motion.div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center" style={{ y: contentY }}>
        {/* Testimonial quote with word-by-word stagger */}
        <div className="min-h-[200px] md:min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <StaggeredWords
              text={current.quote}
              key={`testimonial-${currentIndex}`}
              animKey={`testimonial-${currentIndex}`}
            />
          </AnimatePresence>
        </div>

        {/* Author info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`author-${currentIndex}`}
            className="mt-10 md:mt-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="font-display text-lg md:text-xl text-heading">
                {current.author}
              </span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <span className="font-body text-sm text-text-muted tracking-wider uppercase">
              {current.company}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="group relative p-1 cursor-pointer"
              aria-label={`Depoimento ${index + 1}`}
            >
              <motion.div
                className={cn(
                  "rounded-full transition-colors duration-300",
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-white/20 group-hover:bg-white/40",
                )}
                animate={{
                  width: index === currentIndex ? 32 : 8,
                  height: 8,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.23, 0.86, 0.39, 0.96],
                }}
              />
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
