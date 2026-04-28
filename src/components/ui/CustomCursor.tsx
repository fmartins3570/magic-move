import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Play } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type CursorType = "default" | "link" | "video" | "project" | "hidden";

interface CursorContextValue {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const CursorContext = createContext<CursorContextValue>({
  cursorType: "default",
  setCursorType: () => {},
});

export function useCursor() {
  return useContext(CursorContext);
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

/* ------------------------------------------------------------------ */
/*  Cursor Visuals                                                     */
/* ------------------------------------------------------------------ */

const ringSpring = { stiffness: 150, damping: 20, mass: 0.5 };
const dotSpring = { stiffness: 400, damping: 28, mass: 0.2 };

const ringSize: Record<CursorType, number> = {
  default: 40,
  link: 60,
  video: 80,
  project: 80,
  hidden: 0,
};

const dotSize: Record<CursorType, number> = {
  default: 8,
  link: 4,
  video: 0,
  project: 0,
  hidden: 0,
};

function CursorGraphics({ type }: { type: CursorType }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* Ring follows with a softer spring */
  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);

  /* Dot follows with a snappier spring */
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const rSize = ringSize[type];
  const dSize = dotSize[type];

  const isExpanded = type === "video" || type === "project" || type === "link";

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: rSize,
          height: rSize,
          marginLeft: -rSize / 2,
          marginTop: -rSize / 2,
          mixBlendMode: "difference",
        }}
        animate={{
          width: rSize,
          height: rSize,
          marginLeft: -rSize / 2,
          marginTop: -rSize / 2,
          opacity: type === "hidden" ? 0 : 1,
          backgroundColor:
            isExpanded
              ? "rgba(220, 38, 38, 0.25)"
              : "rgba(255, 255, 255, 0)",
          borderWidth: isExpanded ? 0 : 1.5,
          borderColor: "rgba(255, 255, 255, 0.8)",
        }}
        transition={{ duration: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
      >
        <AnimatePresence mode="wait">
          {type === "video" && (
            <motion.div
              key="video-label"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-0.5"
            >
              <Play className="h-4 w-4 fill-white text-white" />
              <span className="text-[9px] font-semibold uppercase tracking-widest text-white">
                Play
              </span>
            </motion.div>
          )}

          {type === "project" && (
            <motion.div
              key="project-label"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white">
                View
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-white"
        style={{
          x: dotX,
          y: dotY,
          width: dSize,
          height: dSize,
          marginLeft: -dSize / 2,
          marginTop: -dSize / 2,
        }}
        animate={{
          width: dSize,
          height: dSize,
          marginLeft: -dSize / 2,
          marginTop: -dSize / 2,
          opacity: type === "hidden" ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorType, setCursorTypeRaw] = useState<CursorType>("default");
  const [isTouch, setIsTouch] = useState(true); // start hidden until check

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    if (isTouch) return;
    document.body.classList.add("cursor-none");
    return () => {
      document.body.classList.remove("cursor-none");
    };
  }, [isTouch]);

  const setCursorType = useCallback((type: CursorType) => {
    setCursorTypeRaw(type);
  }, []);

  const value = useMemo(
    () => ({ cursorType, setCursorType }),
    [cursorType, setCursorType],
  );

  return (
    <CursorContext.Provider value={value}>
      {children}
      {!isTouch && <CursorGraphics type={cursorType} />}
    </CursorContext.Provider>
  );
}

export default CursorProvider;
