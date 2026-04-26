import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
  className?: string;
};

export function StarRating({ value, onChange, size = 18, readOnly = false, className }: Props) {
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(value);
        return (
          <button
            key={n}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(n)}
            className={cn(
              "rounded transition-transform",
              !readOnly && "hover:scale-110 cursor-pointer",
              readOnly && "cursor-default",
            )}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            <Star
              style={{ width: size, height: size }}
              className={cn(filled ? "fill-warning text-warning" : "fill-transparent text-muted-foreground/40")}
            />
          </button>
        );
      })}
    </div>
  );
}
