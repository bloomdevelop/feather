import { For, Match, Suspense, Switch, useContext } from "solid-js";
import { Flex } from "../components/ui/flex";
import { AuthContext } from "~/lib/contexts/auth";
import { RevoltClient } from "~/lib/client";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { TbHome, TbInfoCircle, TbMessage, TbSettings } from "solid-icons/tb";
import { Button } from "../components/ui/button";
import { A, useLocation, useNavigate } from "@solidjs/router";
import { Separator } from "~/components/ui/separator";
import { ServerContext } from "~/lib/contexts/server";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import loadingFallback from "~/components/fallback/loadingFallback";
import { SettingsContext } from "~/lib/contexts/settings";

export default function baseLayout(props: any) {
  const authContext = useContext(AuthContext);
  const { updateServerBasedOnId, id } = useContext(ServerContext);
  const settingsContext = useContext(SettingsContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(settingsContext?.settings.getAll());
  if (location.pathname === "/") {
    navigate("/home");
  }
  return (
    <>
      <Flex
        class="w-screen h-screen gap-2"
        justifyContent="start"
        flexDirection="row"
      >
        <Flex
          class="max-w-80 w-full h-full p-2 gap-2"
          flexDirection="col"
          justifyContent="start"
          alignItems="center"
        >
          <Button
            onClick={() => {
              navigate("/home");
              updateServerBasedOnId("");
            }}
            class="justify-start w-full gap-2"
            variant={
              location.pathname.includes("/home") ? "default" : "outline"
            }
          >
            <TbHome /> Home
          </Button>
          <Button
            onClick={() => {
              navigate("/dms");
              updateServerBasedOnId("");
            }}
            disabled={!RevoltClient.ready()}
            class="justify-start w-full gap-2"
            variant={location.pathname.includes("/dms") ? "default" : "outline"}
          >
            <TbMessage /> Direct Messages
          </Button>
          <Button
            onClick={() => {
              navigate("/settings");
              updateServerBasedOnId("");
            }}
            class="justify-start w-full gap-2"
            variant={
              location.pathname.includes("/settings") ? "default" : "outline"
            }
          >
            <TbSettings /> Settings
          </Button>
          <Switch>
            <Suspense>
              <Match when={authContext?.isLoggedIn()}>
                <Switch fallback={loadingFallback()}>
                  <Match when={RevoltClient.ready()}>
                    <div class="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={RevoltClient?.user?.avatarURL} />
                        <AvatarFallback>
                          {RevoltClient?.user?.username.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 class="text-lg font-bold">
                          {RevoltClient?.user?.displayName}
                        </h3>
                        <p>
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
                            navigate(`/server/${server.id}`);
                          }}
                          class="justify-start w-full"
                          variant={id() === server.id ? "default" : "outline"}
                        >
                          {server.name}
                        </Button>
                      )}
                    </For>
                  </Match>
                </Switch>
              </Match>
            </Suspense>
            <Match when={!authContext?.isLoggedIn()}>
              <Alert>
                <TbInfoCircle />
                <AlertTitle>Login Needed</AlertTitle>
                <AlertDescription>
                  You need to be logged in to see your servers.
                </AlertDescription>
                <A href="/login">
                  <Button class="mt-2" size="sm">
                    Login
                  </Button>
                </A>
              </Alert>
            </Match>
          </Switch>
        </Flex>
        <Separator orientation="vertical" />
        <div class="w-full h-full">{props.children}</div>
      </Flex>
    </>
  );
}
