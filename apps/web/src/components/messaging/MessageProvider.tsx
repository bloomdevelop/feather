import {
  createEffect,
  createSignal,
  For,
  Match,
  on,
  Show,
  Switch,
  useContext,
} from "solid-js";
import { ChannelContext } from "../../lib/contexts/channel";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Flex } from "~/components/ui/flex";
import { showToast } from "~/components/ui/toast";
import { ContextMenu } from "@kobalte/core/context-menu";
import {
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
} from "~/components/ui/context-menu";
import { TbMessage2Share } from "solid-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useSubscription } from "@solidjs-use/rxjs";
import { interval } from "rxjs";
import { Col, Grid } from "../ui/grid";
import { Message } from "@repo/revolt.js";
import { RevoltClient } from "~/lib/client";
import { Markdown } from "../markdown";
import { Separator } from "../ui/separator";
import SpinnerFallback from "../fallback/spinnerFallback";

export function MessageProvider() {
  const { channel } = useContext(ChannelContext);
  const [prev, setPrev] = createSignal<any>();
  const [messagesSignal, setMessageSignal] = createSignal<Message[]>();

  async function refreshMessages() {
    const msg = await channel()
      ?.fetchMessages({ limit: 100 })
      .catch((err) =>
        showToast({
          variant: "error",
          title: "Error",
          description: err.message,
        })
      );
    if (!prev()) {
      setPrev(msg);
      //@ts-ignore This is wrong I know
      setMessageSignal(msg);
    } else {
      //@ts-ignore This is wrong I know
      setMessageSignal(msg);
    }
  }

  useSubscription(
    interval(1000).subscribe(() => {
      refreshMessages();
    })
  );

  createEffect(
    on(channel, () => {
      refreshMessages();
    })
  );

  return (
    <Show when={messagesSignal()} fallback={<SpinnerFallback size={54} />}>
      <div class="flex flex-col w-full h-full overflow-x gap-2">
        <For each={messagesSignal()}>
          {(message) => (
            <>
              <Show when={!message.systemMessage}>
                <ContextMenu>
                  <ContextMenuTrigger class="w-full">
                    <Card class="transition animate-content-show">
                      <CardHeader class="flex flex-row items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={
                              message.author?.avatarURL ||
                              message.masquerade?.name ||
                              RevoltClient.user?.defaultAvatarURL
                            }
                          />
                          <AvatarFallback>
                            {message.author?.username.substring(0, 2) ||
                              message.author?.displayName.substring(0, 2) ||
                              message.masquerade?.name?.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle>
                          {message.author?.displayName ||
                            message.author?.username ||
                            message.masquerade?.name ||
                            "Unknown"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Markdown content={message.content} />
                        <Show when={message.attachments}>
                          <Grid cols={2} class="gap-2">
                            <For each={message.attachments}>
                              {(attachment) => (
                                <Col>
                                  <img
                                    class="w-full h-full rounded-md"
                                    alt={attachment.filename}
                                    src={attachment.createFileURL()}
                                  />
                                </Col>
                              )}
                            </For>
                          </Grid>
                        </Show>
                      </CardContent>
                    </Card>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem class="flex flex-row items-center gap-2">
                      <TbMessage2Share /> Reply
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </Show>
              <Show when={message.systemMessage}>
                <Switch>
                  <Match when={message.systemMessage?.type === "user_joined"}>
                    <Flex
                      class="w-full"
                      flexDirection="row"
                      justifyContent="between"
                      alignItems="center"
                    >
                      <div class="relative w-full">
                        <div class="absolute inset-0 flex items-center">
                          <span class="w-full border-t" />
                        </div>
                        <div class="relative flex justify-center text-xs">
                          <span class="bg-background px-2 text-muted-foreground">
                            User joined
                          </span>
                        </div>
                      </div>
                    </Flex>
                  </Match>
                  <Match when={message.systemMessage?.type === "user_left"}>
                    <Flex
                      class="w-full"
                      flexDirection="row"
                      justifyContent="between"
                      alignItems="center"
                    >
                      <div class="relative w-full">
                        <div class="absolute inset-0 flex items-center">
                          <span class="w-full border-t" />
                        </div>
                        <div class="relative flex justify-center text-xs">
                          <span class="bg-background px-2 text-muted-foreground">
                            User has left
                          </span>
                        </div>
                      </div>
                    </Flex>
                  </Match>
                  <Match when={message.systemMessage?.type === "user_kicked"}>
                    <Flex
                      class="w-full"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <div class="relative w-full">
                        <div class="absolute inset-0 flex items-center">
                          <span class="w-full border-t" />
                        </div>
                        <div class="relative flex justify-center text-xs">
                          <span class="bg-background px-2 text-muted-foreground">
                            User has been kicked
                          </span>
                        </div>
                      </div>
                    </Flex>
                  </Match>
                  <Match when={message.systemMessage?.type === "user_remove"}>
                    <Flex
                      class="w-full"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <div class="relative w-full">
                        <div class="absolute inset-0 flex items-center">
                          <span class="w-full border-t" />
                        </div>
                        <div class="relative flex justify-center text-xs">
                          <span class="bg-background px-2 text-muted-foreground">
                            User has been removed
                          </span>
                        </div>
                      </div>
                    </Flex>
                  </Match>
                </Switch>
              </Show>
            </>
          )}
        </For>
      </div>
    </Show>
  );
}
