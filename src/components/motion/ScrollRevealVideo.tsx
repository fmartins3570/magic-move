import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Scroll Reveal Video                                                */
/*                                                                     */
/*  A video (or placeholder) that cinematically reveals as the user    */
/*  scrolls it into view. The clip-path expands from a centered inset  */
/*  to full-frame while the element simultaneously scales up.          */
/* ------------------------------------------------------------------ */

interface ScrollRevealVideoProps {
  src?: string;
  poster?: string;
  className?: string;
}

export default function ScrollRevealVideo({
  src,
  poster,
  className,
}: ScrollRevealVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Scroll-driven animation values */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.2"],
  });

  /* Clip-path: inset shrinks from 20% on each side to 0 */
  const clipInset = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const clipPath = useTransform(
    clipInset,
    (v: number) => `inset(${v}% ${v}% ${v}% ${v}% round ${v * 0.4}px)`,
  );

  /* Scale from 0.8 to 1.0 */
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  /* Auto-play video when it enters the viewport */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* Autoplay blocked — silently ignore */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        className="w-full"
        style={{ clipPath, scale }}
      >
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            className="aspect-video w-full object-cover"
          />
        ) : (
          /* Placeholder when no video source is provided */
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-gradient-to-br from-surface via-surface-raised to-surface">
            {/* Animated gradient backdrop */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 50%, rgba(220,38,38,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(220,38,38,0.1) 0%, transparent 50%)",
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface-raised/60 backdrop-blur-sm">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-display text-2xl uppercase tracking-wider text-heading md:text-3xl">
                  Showreel
                </p>
                <p className="mt-1 text-sm tracking-widest text-text-muted">
                  Coming Soon
                </p>
              </div>
            </div>

            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
