import { useRef, useCallback, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Tilt 3D Card                                                       */
/*                                                                     */
/*  A card that tilts in 3D toward the cursor on hover, with an       */
/*  optional glare highlight that follows the mouse for a realistic    */
/*  light-reflection effect.                                           */
/* ------------------------------------------------------------------ */

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees. Default 15. */
  intensity?: number;
  /** Show a moving glare highlight overlay. Default true. */
  glare?: boolean;
}

const springConfig = { stiffness: 250, damping: 24, mass: 0.5 };

export default function Tilt3DCard({
  children,
  className,
  intensity = 15,
  glare = true,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springGlareOpacity = useSpring(glareOpacity, {
    stiffness: 200,
    damping: 30,
  });

  /* Glare gradient as a derived motion value */
  const glareGradient = useTransform<number, string>(
    [glareX, glareY] as MotionValue<number>[],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, rgba(255,255,255,0.4), transparent 40%)`,
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      /* Normalized offset: -1 to 1 */
      const offsetX = (e.clientX - centerX) / (rect.width / 2);
      const offsetY = (e.clientY - centerY) / (rect.height / 2);

      /* RotateX is inverted: moving mouse down tilts the top toward you */
      rotateX.set(-offsetY * intensity);
      rotateY.set(offsetX * intensity);

      /* Glare position as percentage */
      const pctX = ((e.clientX - rect.left) / rect.width) * 100;
      const pctY = ((e.clientY - rect.top) / rect.height) * 100;
      glareX.set(pctX);
      glareY.set(pctY);
      glareOpacity.set(0.15);
    },
    [intensity, rotateX, rotateY, glareX, glareY, glareOpacity],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }, [rotateX, rotateY, glareOpacity]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative", className)}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
    >
      {children}

      {/* Glare overlay */}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{
            opacity: springGlareOpacity,
            background: glareGradient,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
