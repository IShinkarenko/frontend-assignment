import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  setDisableConfigPage,
  setDisableConfigSlider,
} from "src/features/flags";
import { Card, Label, Switch, PageHeader, Divider } from "src/components";

type SettingsItem = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
};

export default function AdminPage() {
  const dispatch = useAppDispatch();
  const disablePage = useAppSelector((s) => s.flags.disableConfigPage);
  const disableSlider = useAppSelector((s) => s.flags.disableConfigSlider);

  const settings: SettingsItem[] = [
    {
      id: "disable-config-page",
      label: "Disable Table Configuration page",
      description: "Hides and blocks access to the page.",
      checked: disablePage,
      onChange: (v) => dispatch(setDisableConfigPage(!!v)),
    },
    {
      id: "disable-config-slider",
      label: "Disable slider on Configuration page",
      description: "Number input remains available.",
      checked: disableSlider,
      onChange: (v) => dispatch(setDisableConfigSlider(!!v)),
    },
  ];

  return (
    <section className="space-y-6">
      <PageHeader
        title="Admin Panel 🛠️"
        description="Toggle feature flags and restrictions 🚦"
      />

      <Card
        title="Feature Flags"
        description="Changes persist across page refreshes."
        className="space-y-4"
      >
        <div className="space-y-4">
          {settings.map((s, i) => (
            <div key={s.id}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label className="font-medium">{s.label}</Label>
                  <p className="text-slate-600 text-sm">{s.description}</p>
                </div>
                <Switch checked={s.checked} onCheckedChange={s.onChange} />
              </div>
              {i < settings.length - 1 ? <Divider className="my-4" /> : null}
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
