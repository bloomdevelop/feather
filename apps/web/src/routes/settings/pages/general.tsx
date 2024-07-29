import { useContext } from "solid-js";
import { Switch, SwitchControl, SwitchThumb, SwitchLabel } from "~/components/ui/switch";
import { SettingsContext } from "~/lib/contexts/settings";

export default function GeneralPage() {
  const settingsContext = useContext(SettingsContext)
  return (
    <>
      <Switch
        class="flex items-center gap-2"
        checked={settingsContext?.settings.general.get("debugMode")}
        onChange={() => {
          settingsContext?.settings.general.set(
            "debugMode",
            !settingsContext?.settings.general.get("debugMode")
          );
        }}
      >
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <div class="flex flex-col gap-2">
          <SwitchLabel class="flex flex-row items-center gap-2">
            Developer Mode
          </SwitchLabel>
          <SwitchLabel class="text-muted-foreground">
            Enables developer mode, intended for testing and debugging purposes.
          </SwitchLabel>
        </div>
      </Switch>
    </>
  );
}