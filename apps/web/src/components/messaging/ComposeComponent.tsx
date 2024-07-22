import {
  TbFilePlus,
  TbPhoto,
  TbMusic,
  TbFile,
  TbSparkles,
  TbAlertTriangle,
  TbSend,
} from "solid-icons/tb";
import { Show, useContext } from "solid-js";
import { AlertTitle, AlertDescription, Alert } from "../ui/alert";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenu,
} from "../ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetFooter } from "../ui/sheet";
import { TextField, TextFieldInput } from "../ui/text-field";
import { TooltipTrigger, TooltipContent, Tooltip } from "../ui/tooltip";
import { Button } from "../ui/button";
import { SettingsContext } from "~/lib/contexts/settings";

export default function ComposeComponent() {
  const settingsContext = useContext(SettingsContext);
  return (
      <TextField class="w-full flex flex-row items-center gap-2">
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
  );
}
