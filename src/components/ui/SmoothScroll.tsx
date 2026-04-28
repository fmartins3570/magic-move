import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
} from "react";
import Lenis from "lenis";

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface SmoothScrollContextValue {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    /* Dispatch a custom event on every scroll frame so other components
       (Framer Motion scroll hooks, GSAP ScrollTrigger, etc.) can listen. */
    lenis.on("scroll", (e: { scroll: number; limit: number; velocity: number; direction: number; progress: number }) => {
      window.dispatchEvent(
        new CustomEvent("lenis-scroll", {
          detail: {
            scroll: e.scroll,
            limit: e.limit,
            velocity: e.velocity,
            direction: e.direction,
            progress: e.progress,
          },
        }),
      );
    });

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* We expose the ref through a getter so consumers always get the live
     instance even though the context value object stays stable. */
  const stableValue = useMemo<SmoothScrollContextValue>(
    () => ({
      get lenis() {
        return lenisRef.current;
      },
    }),
    [],
  );

  return (
    <SmoothScrollContext.Provider value={stableValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export default SmoothScrollProvider;
