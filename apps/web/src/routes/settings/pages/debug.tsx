import { TbFilePlus, TbPhoto, TbMusic, TbFile, TbSend } from "solid-icons/tb";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuGroupLabel, DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { TooltipTrigger, TooltipContent } from "~/components/ui/tooltip";
import { RevoltClient } from "~/lib/client";
import { Separator } from "~/components/ui/separator";
import { Tooltip } from "~/components/ui/tooltip";
import { Button } from "~/components/ui/button";

export default function DebugPage() {
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