import type { Interest } from "@/lib/interests-data";
import { cn } from "@/lib/utils";

interface InterestTagProps {
  interest: Interest;
  isSelected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export function InterestTag({
  interest,
  isSelected = false,
  onClick,
  size = "md",
}: InterestTagProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg",
        sizeClasses[size],
        interest.color,
        isSelected && "ring-2 ring-white ring-offset-2 ring-offset-transparent",
        onClick && "cursor-pointer"
      )}
    >
      <span className="text-lg">{interest.emoji}</span>
      <span>{interest.name}</span>
    </button>
  );
}
