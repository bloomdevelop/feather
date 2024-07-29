import { TbAlertTriangle } from "solid-icons/tb";
import { useContext } from "solid-js";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "~/components/ui/switch";
import { SettingsContext } from "~/lib/contexts/settings";

export default function ExperimentsPage() {
  const settingsContext = useContext(SettingsContext);
  return (
    <>
      <Alert variant="destructive">
        <TbAlertTriangle />
        <AlertTitle>Careful when enabling!</AlertTitle>
        <AlertDescription>
          These experiments are either unstable or it doesn't work, so if you
          find bugs, please report it via Github
        </AlertDescription>
      </Alert>
      <Switch
        class="flex items-center gap-2"
        checked={!!settingsContext?.settings.experiments.get("ai")}
        onChange={() => {
          settingsContext?.settings.experiments.set(
            "ai",
            !settingsContext?.settings.experiments.get("ai")
          );

          console.log(settingsContext?.settings.experiments.get("ai"));
        }}
      >
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <div class="flex flex-col gap-2">
          <SwitchLabel>Artificial Intelligence</SwitchLabel>
          <SwitchLabel class="text-muted-foreground">
            Enables the AI to summarize your and others messages. AI can make
            mistakes. Does use Gemini's API.
          </SwitchLabel>
        </div>
      </Switch>
    </>
  );
}
