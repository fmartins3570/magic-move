import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  category: string;
  thumbnail: string;
  videoPreview?: string;
  onClick?: () => void;
}

export default function ProjectCard({
  title,
  category,
  thumbnail,
  videoPreview,
  onClick,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        /* autoplay may be blocked */
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-lg",
        "aspect-video bg-surface",
        "border-2 border-transparent transition-colors duration-300",
        isHovered && "border-primary",
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
          isHovered && videoPreview ? "opacity-0" : "opacity-100",
        )}
        loading="lazy"
      />

      {/* Video preview */}
      {videoPreview && (
        <video
          ref={videoRef}
          src={videoPreview}
          muted
          loop
          playsInline
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
          {category}
        </span>
        <h3 className="font-display text-lg text-heading md:text-xl">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}
