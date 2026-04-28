import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "icon" | "full";
  className?: string;
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      {/* Rounded background */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="10"
        fill="currentColor"
        fillOpacity="0.1"
      />
      {/* Stylised "M" monogram */}
      <path
        d="M10 38V14l8 12 6-12 6 12 8-12v24"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Red accent dot */}
      <circle cx="38" cy="14" r="3" fill="#DC2626" />
    </svg>
  );
}

export default function Logo({ variant = "full", className }: LogoProps) {
  if (variant === "icon") {
    return <LogoIcon className={className} />;
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoIcon />
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl tracking-wider text-heading">
          Magic Move
        </span>
        <span className="text-[0.55rem] font-medium uppercase tracking-[0.25em] text-text-muted">
          Animation Brasil
        </span>
      </div>
    </div>
  );
}
