import {
  createEffect,
  createSignal,
  For,
  on,
  Show,
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
import { SolidMarkdown } from "solid-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useSubscription } from "@solidjs-use/rxjs";
import { interval } from "rxjs";
import { Col, Grid } from "../ui/grid";
import { Message } from "@repo/revolt.js";
import { RevoltClient } from "~/lib/client";

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
    <Show when={messagesSignal()}>
      <Flex
        class="w-full h-full overflow-x gap-2"
        justifyContent="start"
        alignItems="start"
        flexDirection="col"
      >
        <For each={messagesSignal()}>
          {(message) => (
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
                    <SolidMarkdown
                      class="prose prose-neutral dark:prose-invert"
                      children={message.content}
                    />
                    <Show when={message.attachments}>
                      <Grid colsLg={4} cols={2}>
                        <For each={message.attachments}>
                          {(attachment) => (
                            <Col>
                              <img
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
          )}
        </For>
      </Flex>
    </Show>
  );
}
