import { TbAlertCircle, TbUsersGroup } from "solid-icons/tb";
import { createResource, For, Match, Show, Switch, useContext } from "solid-js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Flex } from "~/components/ui/flex";
import { Separator } from "~/components/ui/separator";
import { ChannelContext } from "~/utils/contexts/channel";
import { ServerContext } from "~/utils/contexts/server";
import { Label } from "~/components/ui/label.tsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar.tsx";
import { showToast } from "~/components/ui/toast.tsx";

export default function serverLayout(props: any) {
  const { server } = useContext(ServerContext);
  const channelContext = useContext(ChannelContext);

  const [membersList] = createResource(() => {
    return server()
      ?.fetchMembers()
      .catch((e) =>
        showToast({
          title: "Couldn't fecth members list",
          variant: "error",
          description: e.message,
        })
      );
    // Awaiting for Revolt team to respond, but Revolt API server is so dead 🥀
  });

  return (
    <Flex
      justifyContent="start"
      flexDirection="row"
      class="w-full h-full gap-2"
    >
      <Flex
        class="max-w-72 w-full h-full gap-2 py-2 overflow-auto"
        flexDirection="col"
        justifyContent="start"
        alignItems="start"
      >
        <Switch
          fallback={
            <Alert>
              <TbAlertCircle />
              <AlertTitle>No Channels</AlertTitle>
              <AlertDescription>
                This server has no channels...
              </AlertDescription>
            </Alert>
          }
        >
          <Match when={server()?.channels}>
            <Flex class={"gap-2"}>
              <Label>{membersList()?.members?.length || 0} Members</Label>
              <Sheet>
                <SheetTrigger as={Button<"button">} variant="outline">
                  <TbUsersGroup />
                </SheetTrigger>
                <SheetContent position={"right"}>
                  <SheetHeader>
                    <SheetTitle>Members List </SheetTitle>
                  </SheetHeader>
                  <Show
                    when={membersList()?.members}
                    fallback={
                      <div class="flex w-full h-full items-center justify-center">
                        <h1 class="text-xl font-bold">Unable to fetch members...</h1>
                      </div>
                    }
                  >
                    <div class="py-4">
                      <For each={membersList()?.members}>
                        {(member) => (
                          <Flex>
                            <Avatar>
                              <AvatarImage src={member.avatarURL} />
                              <AvatarFallback>
                                {member.user?.username.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div class="flex flex-col gap-2">
                              <p>{member.nickname}</p>
                              <p>@{member.user?.username}</p>
                            </div>
                          </Flex>
                        )}
                      </For>
                    </div>
                  </Show>
                </SheetContent>
              </Sheet>
            </Flex>
            <Separator />
            <Accordion multiple collapsible class="w-full">
              <For each={server()?.orderedChannels}>
                {(category) => (
                  <AccordionItem value={`${category.id}`}>
                    <AccordionTrigger>{category.title}</AccordionTrigger>
                    <AccordionContent>
                      <Flex class="gap-2" flexDirection="col">
                        <For each={category.channels}>
                          {(channel) => (
                            <Button
                              onClick={() => {
                                channelContext.updateChannelBasedOnId(
                                  channel.id
                                );
                                // RevoltClient.api.get("-/channels/{target}/messages", {
                                //   limit: 100,
                                //   include_users: true,
                                //   after: channel.lastMessage?.id
                                // }, {
                                //   headers: {
                                //     "X-Session-Token": `${RevoltClient.sessions.get(`${RevoltClient.sessionId}`).}`
                                //   }
                                // });
                              }}
                              class="justify-start w-full gap-2"
                              variant={
                                channelContext.id() === channel.id
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {channel.name}
                            </Button>
                          )}
                        </For>
                      </Flex>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </For>
            </Accordion>
          </Match>
        </Switch>
      </Flex>

      <Separator orientation="vertical" />
      <div class="w-full h-full p-2">{props.children}</div>
    </Flex>
  );
}
