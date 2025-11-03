import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setRowsCount } from "src/features/config";
import { Card, Slider, Input, Label } from "src/components";
import { cn } from "src/utils/twMerge";

export default function ConfigPage() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((s) => s.config.rowsCount);
  const sliderDisabled = useAppSelector((s) => s.flags.disableConfigSlider);

  const onNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);

      if (!Number.isNaN(next)) {
        dispatch(setRowsCount(next));
      }
    },
    [dispatch]
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Table Configuration</h1>
        <p className="text-slate-600 mt-2">
          Choose how many rows to display (1–10).
        </p>
      </div>

      <Card
        title="Rows"
        description="Both controls update the same value."
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <Label className="mb-2 block" htmlFor="rows-slider">
              Slider
            </Label>
            <Slider
              id="rows-slider"
              value={[value]}
              min={1}
              max={10}
              step={1}
              onValueChange={(vals) => dispatch(setRowsCount(vals[0]))}
              aria-valuenow={value}
              aria-valuemin={1}
              aria-valuemax={10}
              disabled={sliderDisabled}
              className={cn(
                "w-full",
                sliderDisabled ? "opacity-50 cursor-not-allowed" : ""
              )}
            />
          </div>
          <div>
            <Label className="mb-2 block" htmlFor="rows-input">
              Number
            </Label>
            <Input
              id="rows-input"
              type="number"
              inputMode="numeric"
              min={1}
              max={10}
              step={1}
              value={value}
              onChange={onNumberChange}
              disabled={sliderDisabled}
            />
          </div>
        </div>
      </Card>
    </section>
  );
}
