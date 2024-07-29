import { TbFilePlus, TbPhoto, TbMusic, TbFile, TbSparkles, TbAlertTriangle, TbSend } from "solid-icons/tb";
import { Show, useContext } from "solid-js";
import { AlertTitle, AlertDescription } from "~/components/ui/alert";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuGroupLabel, DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetFooter } from "~/components/ui/sheet";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { TooltipTrigger, TooltipContent } from "~/components/ui/tooltip";
import { RevoltClient } from "~/lib/client";
import { Separator } from "~/components/ui/separator";
import { Tooltip } from "~/components/ui/tooltip";
import { Button } from "~/components/ui/button";
import { Alert } from "~/components/ui/alert";
import { SettingsContext } from "~/lib/contexts/settings";

export default function DebugPage() {
  const settingsContext = useContext(SettingsContext)
  return (
    <>
      <h1 class="font-bold text-2xl">Components</h1>
      <Separator />
      <h2 class="font-bold text-xl">Input</h2>
      <TextField class="flex flex-row items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Tooltip>
              <TooltipTrigger as={Button<"button">} variant="outline">
                <TbFilePlus />
              </TooltipTrigger>
              <TooltipContent>Add Files</TooltipContent>
            </Tooltip>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuGroupLabel>Add attachments</DropdownMenuGroupLabel>
              <DropdownMenuItem class="flex items-center gap-2">
                <TbPhoto /> Picture
              </DropdownMenuItem>
              <DropdownMenuItem class="flex items-center gap-2">
                <TbMusic /> Audio
              </DropdownMenuItem>
              <DropdownMenuItem class="flex items-center gap-2">
                <TbFile /> Files
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <TextFieldInput
          type="text"
          class="flex-grow"
          placeholder="Type an message"
          autocomplete="none"
        />

        <Show when={settingsContext?.settings.experiments.get("ai")}>
          <Sheet>
            <SheetTrigger
              disabled={
                settingsContext?.settings.experiments.get("aiAPIKey") === ""
              }
            >
              <Tooltip>
                <TooltipTrigger
                  as={Button<"button">}
                  variant="outline"
                  disabled={
                    settingsContext?.settings.experiments.get("aiAPIKey") === ""
                  }
                >
                  <TbSparkles />
                </TooltipTrigger>
                <TooltipContent>Summarize</TooltipContent>
              </Tooltip>
            </SheetTrigger>
            <SheetContent title="Summarize" position="right">
              <div class="flex flex-col justify-between w-full h-full pb-6">
                <Alert>
                  <TbAlertTriangle />
                  <AlertTitle>Coming Soon...</AlertTitle>
                  <AlertDescription>
                    This feature is not complete and will be added soon.
                  </AlertDescription>
                </Alert>

                <SheetFooter>
                  <TextField class="flex w-full items-center gap-2">
                    <TextFieldInput
                      type="text"
                      placeholder="Type an prompt to fix the issue."
                    />
                    <Tooltip>
                      <TooltipTrigger as={Button<"button">}>
                        <TbSend />
                      </TooltipTrigger>
                      <TooltipContent>Send</TooltipContent>
                    </Tooltip>
                  </TextField>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </Show>

        <Tooltip>
          <TooltipTrigger as={Button<"button">} variant="outline">
            <TbSend />
          </TooltipTrigger>
          <TooltipContent>Send</TooltipContent>
        </Tooltip>
      </TextField>
      <Separator />
      <h2 class="font-bold text-xl">Revolt.js</h2>
      <p>Session Token: {RevoltClient.sessionToken || "No Session Token..."}</p>
    </>
  );
}