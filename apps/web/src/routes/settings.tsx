import { useColorMode } from "@kobalte/core";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroupLabel,
  DropdownMenuGroup,
} from "~/components/ui/dropdown-menu";
import { Flex } from "~/components/ui/flex";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  TbAlertTriangle,
  TbCode,
  TbDeviceLaptop,
  TbFile,
  TbFilePlus,
  TbFlask,
  TbInfoCircle,
  TbLogout,
  TbMoon,
  TbMusic,
  TbPaint,
  TbPhoto,
  TbSend,
  TbSettings,
  TbSparkles,
  TbSun,
  TbUserCog,
} from "solid-icons/tb";
import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "~/components/ui/switch";
import { SettingsContext } from "~/lib/contexts/settings";
import { createEffect, Show, useContext } from "solid-js";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert.tsx";
import { Badge } from "~/components/ui/badge.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { RevoltClient } from "~/lib/client";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Sheet, SheetContent,
  SheetFooter, SheetTrigger
} from "~/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function settingsPage() {
  const { setColorMode, colorMode } = useColorMode();
  const settingsContext = useContext(SettingsContext);
  createEffect(() => {
    console.log(settingsContext?.settings.experiments.get("ai"));
  });

  return (
    <Flex
      flexDirection="col"
      justifyContent="start"
      alignItems="start"
      class="p-4 gap-2"
    >
      <h1 class="font-bold text-4xl">Settings</h1>
      <Tabs class="w-full" defaultValue={"account"}>
        <TabsList>
          <TabsTrigger class="flex flex-row gap-2" value={"account"}>
            <TbUserCog /> Account
          </TabsTrigger>
          <TabsTrigger class="flex flex-row gap-2" value={"general"}>
            <TbSettings /> General
          </TabsTrigger>
          <TabsTrigger class="flex flex-row gap-2" value={"appearance"}>
            <TbPaint /> Appearance
          </TabsTrigger>
          <TabsTrigger class="flex flex-row gap-2" value={"experiments"}>
            <TbFlask /> Experiments
          </TabsTrigger>
          <Show when={settingsContext?.settings.experiments.get("ai")}>
            <TabsTrigger class="flex flex-row gap-2" value={"ai"}>
              <TbSparkles /> AI
            </TabsTrigger>
          </Show>
          <Show when={settingsContext?.settings.general.get("debugMode")}>
            <TabsTrigger class="flex flex-row gap-2" value={"debug"}>
              <TbCode /> Developer
            </TabsTrigger>
          </Show>
          <TabsTrigger class="flex flex-row gap-2" value={"about"}>
            <TbInfoCircle /> About
          </TabsTrigger>
        </TabsList>
        <TabsContent class="flex flex-col gap-4" value={"account"}>
          <h1 class="font-bold text-2xl">Work in Progress</h1>
          <Dialog>
            <DialogTrigger
              as={Button<"button">}
              variant={"destructive"}
              class="w-max flex flex-row items-center gap-2"
            >
              <TbLogout /> Log Out
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <AlertTitle>Are you sure?</AlertTitle>
              </DialogHeader>
              <div class="py-4">
                <p>
                  It will log out your account and delete the session if you
                  press Logout.
                </p>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    // Self-destruct the session.
                    RevoltClient.sessions.delete(`${RevoltClient.sessionId}`);
                    RevoltClient.emit("logout");
                  }}
                  class="w-max flex flex-row items-center gap-2"
                  variant={"destructive"}
                >
                  <TbLogout /> Log Out
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        <TabsContent class="flex flex-col gap-4" value={"general"}>
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
                Enables developer mode, intended for testing and debugging
                purposes.
              </SwitchLabel>
            </div>
          </Switch>
        </TabsContent>
        <TabsContent class="flex flex-col gap-4" value={"appearance"}>
          <Flex justifyContent="start" alignItems="center" class="gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger as={Button<"button">} variant="outline">
                {(colorMode() == "dark" && (
                  <span class="flex items-center gap-2">
                    <TbMoon /> Dark
                  </span>
                )) ||
                  (colorMode() == "light" && (
                    <span class="flex items-center gap-2">
                      <TbSun /> Light
                    </span>
                  ))}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setColorMode("light")}>
                  <span class="flex items-center gap-2">
                    <TbSun /> Light
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setColorMode("dark")}>
                  <span class="flex items-center gap-2">
                    <TbMoon />
                    Dark
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setColorMode("system")}>
                  <span class="flex items-center gap-2">
                    <TbDeviceLaptop />
                    System
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div class="flex flex-col gap-2">
              <Label>Color Mode</Label>
              <Label class="text-muted-foreground">
                Changes the color mode based on your system, or use only
                light/dark mode.
              </Label>
            </div>
          </Flex>
          <Switch
            class="flex items-center gap-2"
            checked={settingsContext?.settings.appearance.get("compactMode")}
            onChange={() => {
              settingsContext?.settings.appearance.set(
                "compactMode",
                !settingsContext?.settings.appearance.get("compactMode")
              );
            }}
          >
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
            <div class="flex flex-col gap-2">
              <SwitchLabel class="flex flex-row items-center gap-2">
                Compact Mode<Badge variant={"destructive"}>Doesn't Work</Badge>
              </SwitchLabel>
              <SwitchLabel class="text-muted-foreground">
                Shrinks the server navigation bar into icons only. Saves more
                spaces.
              </SwitchLabel>
            </div>
          </Switch>
        </TabsContent>
        <TabsContent class="flex flex-col gap-4" value={"experiments"}>
          <Alert variant="destructive">
            <TbAlertTriangle />
            <AlertTitle>Careful when enabling!</AlertTitle>
            <AlertDescription>
              These experiments are either unstable or it doesn't work, so if
              you find bugs, please report it via Github
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
                Enables the AI to summarize your and others messages. AI can
                make mistakes. Does use Gemini's API.
              </SwitchLabel>
            </div>
          </Switch>
        </TabsContent>
        <TabsContent class="flex flex-col gap-4" value={"ai"}>
          <TextField class="flex w-max flex-row items-center gap-2">
            <div class="flex flex-col gap-2">
              <TextFieldLabel>Gemini API Key</TextFieldLabel>
              <TextFieldLabel class="text-muted-foreground">
                Required to use "Summarize" feature.
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
                  "aiAPIKey",
                  (e.currentTarget as HTMLInputElement).value
                );
              }}
              placeholder="API Key"
            />
          </TextField>
        </TabsContent>
        <TabsContent class="flex flex-col gap-4" value={"debug"}>
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
                  <DropdownMenuGroupLabel>
                    Add attachments
                  </DropdownMenuGroupLabel>
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
                        settingsContext?.settings.experiments.get(
                          "aiAPIKey"
                        ) === ""
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
          <p>
            Session Token: {RevoltClient.sessionToken || "No Session Token..."}
          </p>
        </TabsContent>
        <TabsContent class="flex flex-col gap-4" value={"about"}>
          <h1 class="text-4xl font-bold">Feather</h1>
          <h3 class="text-2xl">Version: 0.2.0</h3>
          <h1 class="text-3xl font-bold">Acknowledgements</h1>
          <p>This client wouldn't be possible without these libraries:</p>
          <Flex justifyContent="start" alignItems="center" class="gap-2">
            <h1 class="text-xl font-bold">Solid-js</h1>
            <p>By solidjs</p>
          </Flex>
          <Flex justifyContent="start" alignItems="center" class="gap-2">
            <h1 class="text-xl font-bold">Revolt.js</h1>
            <p>By insertfish, modified by bloomdevelop</p>
          </Flex>
          <Flex justifyContent="start" alignItems="center" class="gap-2">
            <h1 class="text-xl font-bold">
              solid-ui {"(reusable components)"}
            </h1>
            <p>By sek-consulting</p>
          </Flex>
          <Flex justifyContent="start" alignItems="center" class="gap-2">
            <h1 class="text-xl font-bold">@kobalte/core</h1>
            <p>By kobaltedev</p>
          </Flex>
          <Flex justifyContent="start" alignItems="center" class="gap-2">
            <h1 class="text-xl font-bold">@corvu/drawer</h1>
            <p>By corvudev</p>
          </Flex>
        </TabsContent>
      </Tabs>
    </Flex>
  );
}
