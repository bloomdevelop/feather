import {
  createEffect,
  createResource,
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

export function MessageProvider() {
  const { channel } = useContext(ChannelContext);
  const [messagesResource, { refetch: refreshMessages }] = createResource(
    () => {
      console.log(channel()?.id);
      if (channel()?.id) {
        return channel()
          ?.fetchMessagesWithUsers({
            limit: 100,
          })
          .catch((err) =>
            showToast({
              variant: "error",
              title: "Error",
              description: err.message,
            })
          );
      } else return;
    }
  );

  createEffect(on(channel, () => refreshMessages()));
  return (
    <Show when={messagesResource()}>
      <Flex
        class="w-full h-full overflow-x gap-2"
        justifyContent="start"
        alignItems="start"
        flexDirection="col"
      >
        <For each={messagesResource()?.messages}>
          {(message) => (
            <ContextMenu>
              <ContextMenuTrigger class="w-full">
                <Card>
                  <CardHeader class="flex flex-row items-center gap-2">
                    <Avatar>
                      <AvatarImage src={message.author?.avatarURL} />
                      <AvatarFallback>
                        {message.author?.username.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{message.author?.displayName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SolidMarkdown
                      class="prose prose-neutral dark:prose-invert"
                      children={message.content}
                    />
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
