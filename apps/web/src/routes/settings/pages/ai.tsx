import { useContext } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Flex } from "~/components/ui/flex";
import { Label } from "~/components/ui/label";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { SettingsContext } from "~/lib/contexts/settings";

export default function AiPage() {
  const settingsContext = useContext(SettingsContext);
  return (
    <>
      <TextField class="flex w-max flex-row items-center gap-2">
        <TextFieldLabel class="w-full">
          Gemini API Key (Required)
        </TextFieldLabel>
        <TextFieldInput
          type="text"
          value={
            settingsContext &&
            settingsContext.settings.experiments.get("aiAPIKey")
          }
          autocomplete="off"
          autocorrect="off"
          onChange={(e: Event) => {
            settingsContext?.settings.experiments.set(
              "aiAPIKey",
              (e.currentTarget as HTMLInputElement).value
            );
          }}
          placeholder="API Key"
        />
      </TextField>
      <Flex
        flexDirection="row"
        justifyContent="start"
        alignItems="center"
        class="gap-2"
      >
        <Label>AI Model</Label>
        <DropdownMenu>
          <DropdownMenuTrigger
            class="w-max"
            as={Button<"button">}
            variant="outline"
          >
            {settingsContext?.settings.experiments.get("aiModel")}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                settingsContext?.settings.experiments.set(
                  "aiModel",
                  "gemini-1.0-pro"
                )
              }
            >
              gemini-1.0-pro
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                settingsContext?.settings.experiments.set(
                  "aiModel",
                  "gemini-1.5-pro"
                )
              }
            >
              gemini-1.5-pro
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                settingsContext?.settings.experiments.set(
                  "aiModel",
                  "gemini-1.5-flash"
                )
              }
            >
              gemini-1.5-flash
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                settingsContext?.settings.experiments.set(
                  "aiModel",
                  "gemma-2-9b-it"
                )
              }
            >
              gemma-2-9b-pro
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                settingsContext?.settings.experiments.set(
                  "aiModel",
                  "gemma-2-27b-it"
                )
              }
            >
              gemm2-2-27b-pro
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>

      <TextField class="flex w-max flex-row items-center gap-2">
        <div class="w-full flex flex-col gap-2">
          <TextFieldLabel class="w-full">System Instruction</TextFieldLabel>
          <TextFieldLabel class="w-full text-muted-foreground">
            Instruct AI what to do.
          </TextFieldLabel>
        </div>
        <TextFieldInput
          type="text"
          value={
            settingsContext &&
            settingsContext.settings.experiments.get("aiAPIKey")
          }
          onChange={(e: Event) => {
            settingsContext?.settings.experiments.set(
              "aiSystemInstructions",
              (e.currentTarget as HTMLInputElement).value
            );
          }}
          placeholder="Type your instructions here"
        />
      </TextField>
    </>
  );
}
