import { For, Show, Suspense, useContext } from "solid-js";
import { Flex } from "../components/ui/flex";
import { AuthContext } from "~/lib/contexts/auth";
import { RevoltClient } from "~/lib/client";
import { TbHome, TbMessage, TbSettings } from "solid-icons/tb";
import { Button } from "../components/ui/button";
import { useLocation, useNavigate } from "@solidjs/router";
import { Separator } from "~/components/ui/separator";
import { ServerContext } from "~/lib/contexts/server";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import loadingFallback from "~/components/fallback/loadingFallback";
import { SettingsContext } from "~/lib/contexts/settings";
import { ChannelContext } from "~/lib/contexts/channel";

export default function baseLayout(props: any) {
  const { isLoggedIn } = useContext(AuthContext);
  const { updateServerBasedOnId, id } = useContext(ServerContext);
  const { setId } = useContext(ChannelContext);
  const settingsContext = useContext(SettingsContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") {
    navigate("/home");
  }

  if (!isLoggedIn()) {
    const redirect = useNavigate();
    redirect("/login");
  }

  return (
    <>
      <Flex
        class="w-screen h-screen"
        justifyContent="start"
        flexDirection="row"
      >
        <Flex
          classList={{
            "max-w-80 h-full p-2 gap-2": true,
            "w-full": !settingsContext?.settings.appearance.get("compactMode"),
            "w-max": settingsContext?.settings.appearance.get("compactMode"),
          }}
          flexDirection="col"
          justifyContent="start"
          alignItems="center"
        >
          <Button
            onClick={() => {
              navigate("/home");
              updateServerBasedOnId("");
            }}
            class={
              settingsContext?.settings.appearance.get("compactMode")
                ? "flex flex-row items-center w-full h-12 gap-2 justify-center"
                : "flex flex-row items-center w-full gap-2 justify-start"
            }
            variant={
              location.pathname.includes("/home") ? "default" : "outline"
            }
          >
            <TbHome />{" "}
            <p
              class={
                settingsContext?.settings.appearance.get("compactMode")
                  ? "hidden"
                  : ""
              }
            >
              Home
            </p>
          </Button>
          <Button
            onClick={() => {
              navigate("/dms");
              updateServerBasedOnId("");
            }}
            disabled={!RevoltClient.ready()}
            class={
              settingsContext?.settings.appearance.get("compactMode")
                ? "flex flex-row items-center w-full h-12 gap-2 justify-center"
                : "flex flex-row items-center w-full gap-2 justify-start"
            }
            variant={location.pathname.includes("/dms") ? "default" : "outline"}
          >
            <TbMessage />{" "}
            <p
              class={
                settingsContext?.settings.appearance.get("compactMode")
                  ? "hidden"
                  : ""
              }
            >
              Direct Messages
            </p>
          </Button>
          <Button
            onClick={() => {
              navigate("/settings");
              updateServerBasedOnId("");
            }}
            class={
              settingsContext?.settings.appearance.get("compactMode")
                ? "flex flex-row items-center w-full h-12 gap-2 justify-center"
                : "flex flex-row items-center w-full gap-2 justify-start"
            }
            variant={
              location.pathname.includes("/settings") ? "default" : "outline"
            }
          >
            <TbSettings />
            <p
              class={
                settingsContext?.settings.appearance.get("compactMode")
                  ? "hidden"
                  : ""
              }
            >
              Settings
            </p>
          </Button>
          <Suspense fallback={loadingFallback()}>
            <Show when={RevoltClient.ready()}>
              <div class="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={RevoltClient?.user?.avatarURL} />
                  <AvatarFallback>
                    {RevoltClient?.user?.username.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div
                  class={
                    settingsContext?.settings.appearance.get("compactMode")
                      ? "hidden"
                      : ""
                  }
                >
                  <h3 class="text-lg font-bold">
                    {RevoltClient?.user?.displayName}
                  </h3>
                  <p
                    class={
                      settingsContext?.settings.appearance.get("compactMode")
                        ? "hidden"
                        : ""
                    }
                  >
                    @{RevoltClient?.user?.username}#
                    {RevoltClient?.user?.discriminator}
                  </p>
                </div>
              </div>
              <Separator />
              <For each={RevoltClient.servers.toList()}>
                {(server) => (
                  <Button
                    onClick={() => {
                      updateServerBasedOnId(server.id);
                      setId("");
                      navigate(`/server/${server.id}`);
                    }}
                    class={
                      settingsContext?.settings.appearance.get("compactMode")
                        ? "flex justify-center items-center gap-2 w-full h-12"
                        : "flex justify-start items-center gap-2 w-full"
                    }
                    variant={id() === server.id ? "default" : "outline"}
                  >
                    <Avatar class="w-6 h-6 justify-center items-center">
                      <AvatarImage src={server.iconURL} />
                      <AvatarFallback>
                        {server.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <p
                      class={
                        settingsContext?.settings.appearance.get("compactMode")
                          ? "hidden"
                          : ""
                      }
                    >
                      {server.name}
                    </p>
                  </Button>
                )}
              </For>
            </Show>
          </Suspense>
        </Flex>
        <Separator orientation="vertical" />
        <div class="w-full h-full">{props.children}</div>
      </Flex>
    </>
  );
}
