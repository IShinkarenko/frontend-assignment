import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setRowsCount } from "src/features/config";
import { Card, Slider, Input, Label, PageHeader } from "src/components";
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
      <PageHeader
        title="Table Configuration ⚙️"
        description="Choose how many rows to display. Value persists across refresh 💾"
      />

      <Card
        title="Rows"
        description="Both controls update the same value. Allowed range is 1-10."
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-center">
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
            <p className="mt-2 text-xs text-muted-foreground">
              {sliderDisabled
                ? "Slider is disabled in Admin"
                : "Use arrow keys for fine control"}
            </p>
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
