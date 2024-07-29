import { Flex } from "~/components/ui/flex";
import {
  TbCode, TbFlask,
  TbInfoCircle, TbPaint, TbSettings, TbUserCog
} from "solid-icons/tb";
import { SettingsContext } from "~/lib/contexts/settings";
import { Show, useContext } from "solid-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import AccountPage from "./pages/account";
import GeneralPage from "./pages/general";
import AppearancePage from "./pages/appearance";
import ExperimentsPage from "./pages/experiments";
import AboutPage from "./pages/about";
import DebugPage from "./pages/debug";

export default function settingsPage() {
  const settingsContext = useContext(SettingsContext);

  return (
    <Flex
      flexDirection="col"
      justifyContent="start"
      alignItems="start"
      class="p-4 gap-2"
    >
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
          <AccountPage/>
        </TabsContent>
        <TabsContent class="flex flex-col gap-4" value={"general"}>
          <GeneralPage />
        </TabsContent>
        <TabsContent class="flex flex-col gap-4" value={"appearance"}>
          <AppearancePage />
        </TabsContent>
        <TabsContent class="flex flex-col gap-4" value={"experiments"}>
          <ExperimentsPage />
        </TabsContent>
        <TabsContent class="flex flex-col gap-4" value={"debug"}>
          <DebugPage />
        </TabsContent>
        <TabsContent class="flex flex-col gap-4" value={"about"}>
          <AboutPage />
        </TabsContent>
      </Tabs>
    </Flex>
  );
}
