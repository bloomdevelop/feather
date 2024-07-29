import { useColorMode } from "@kobalte/core";
import { TbMoon, TbSun, TbDeviceLaptop } from "solid-icons/tb";
import { useContext } from "solid-js";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Flex } from "~/components/ui/flex";
import {
  SwitchControl,
  SwitchThumb,
  SwitchLabel,
} from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { SettingsContext } from "~/lib/contexts/settings";
import { Switch } from "~/components/ui/switch";

export default function AppearancePage() {
  const { colorMode, setColorMode } = useColorMode();
  const settingsContext = useContext(SettingsContext);
  return (
    <>
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
            Changes the color mode based on your system, or use only light/dark
            mode.
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
        <div class="flex items-center gap-2">
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <div class="flex flex-col gap-2">
            <SwitchLabel class="flex flex-row items-center gap-2">
              Compact Mode
            </SwitchLabel>
            <SwitchLabel class="text-muted-foreground">
              Shrinks the server navigation bar into icons, it saves more
              spaces. Useful if you have a small screen.
            </SwitchLabel>
          </div>
        </div>
      </Switch>
    </>
  );
}
