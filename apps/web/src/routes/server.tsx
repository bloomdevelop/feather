import { TbAlertCircle, TbInfoCircle } from "solid-icons/tb";
import { Match, Switch, useContext, Show, Suspense } from "solid-js";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Flex } from "~/components/ui/flex";
import { ChannelContext } from "~/lib/contexts/channel";
import { ServerContext } from "~/lib/contexts/server";
import { AuthContext } from "~/lib/contexts/auth";
import { MessageProvider } from "~/components/messaging/MessageProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import ComposeComponent from "~/components/messaging/ComposeComponent";

export default function serverPage() {
  const { server } = useContext(ServerContext);
  const { channel } = useContext(ChannelContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Suspense>
      <Show when={!isLoggedIn()}>
        <Alert>
          <TbAlertCircle />
          <AlertTitle>Login Required</AlertTitle>
          <AlertDescription>
            You need to be logged in to view this server.
          </AlertDescription>
        </Alert>
      </Show>
      <Show when={server() && !channel()}>
        <div class="container">
          <Flex
            flexDirection="col"
            class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 gap-4"
          >
            <Switch>
              <Match when={server()?.bannerURL}>
                <AspectRatio ratio={16 / 9} class="relative">
                  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                  <img
                    src={server()?.bannerURL}
                    alt={`${server()?.name}'s banner`}
                    class="size-full rounded-md object-cover image-render-edge"
                  />
                  <div class="absolute flex flex-row gap-2 top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-md">
                    {server()?.name}{" "}
                    {server()?.owner && `by ${server()?.owner?.username}`}
                  </div>
                </AspectRatio>
              </Match>
              <Match when={server()?.bannerURL == null}>
                <h1 class="text-2xl font-bold text-center">{server()?.name}</h1>
                <Show when={server()?.owner}>
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    class="gap-2"
                  >
                    <Avatar>
                      <AvatarImage src={server()?.owner?.avatarURL} />
                      <AvatarFallback>
                        {server()?.owner?.username.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div class="flex flex-col">
                      <p class="text-lg font-bold">
                        {server()?.owner?.displayName}
                      </p>
                      <p>@{server()?.owner?.username}</p>
                    </div>
                  </Flex>
                </Show>
              </Match>
            </Switch>
            <p class="text-center text-sm text-muted-foreground">
              {server()?.description || "No description provided."}
            </p>

            <Alert>
              <TbInfoCircle />
              <AlertTitle>How to open channels?</AlertTitle>
              <AlertDescription>
                To enter a channel, open a category and select a channel inside
                a category.
              </AlertDescription>
            </Alert>
          </Flex>
        </div>
      </Show>
      <Show when={channel()}>
        <div class="w-full h-full overflow-auto">
          <div class="z-20 sticky top-0 flex flex-row gap-2 items-center w-full bg-background border-b-2 border-b-muted  shadow-md p-4">
            <span class="text-xl font-bold">{channel()?.name}</span>
            <Popover>
              <PopoverTrigger>
                <Tooltip>
                  <TooltipTrigger as={Button<"button">} variant="outline">
                    <TbInfoCircle />
                  </TooltipTrigger>
                  <TooltipContent>Channel Topic</TooltipContent>
                </Tooltip>
              </PopoverTrigger>
              <PopoverContent>
                {channel()?.description || "No description provided."}
              </PopoverContent>
            </Popover>
          </div>
          <div class="block p-2">
            <Suspense
              fallback={
                <div class="w-full h-full flex justify-center items-center text-4xl font-bold">
                  <svg class="h-24 w-24 animate-spin" viewBox="0 0 100 100">
                    <circle
                      fill="none"
                      stroke-width="10"
                      class="stroke-muted"
                      cx="50"
                      cy="50"
                      r="40"
                    />
                    <circle
                      fill="none"
                      stroke-width="10"
                      class="stroke-muted-foreground"
                      stroke-dasharray="250"
                      stroke-dashoffset="210"
                      cx="50"
                      cy="50"
                      r="40"
                    />
                  </svg>
                </div>
              }
            >
              <MessageProvider />
            </Suspense>
          </div>
          <div class="z-10 sticky bottom-0 w-full flex flex-row gap-2 items-center bg-background border-t-2 border-t-muted p-4">
            <ComposeComponent
              disabled={!channel()?.havePermission("SendMessage")}
            />
          </div>
        </div>
      </Show>
    </Suspense>
  );
}
