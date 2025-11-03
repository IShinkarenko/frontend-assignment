import { cn } from "src/utils/twMerge";

type SliderProps = {
  id?: string;
  value: number[]; // keep [value] API for compatibility
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number[]) => void;
  disabled?: boolean;
  className?: string;
  "aria-valuenow"?: number;
  "aria-valuemin"?: number;
  "aria-valuemax"?: number;
};

export function Slider({ className, value, onValueChange, ...props }: SliderProps) {
  const current = value?.[0] ?? 0;
  return (
    <input
      type="range"
      className={cn(
        "w-full h-2 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed bg-slate-200",
        className
      )}
      value={current}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      {...props}
    />
  );
}
