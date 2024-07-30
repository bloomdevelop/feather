import {
  TbAlertCircle,
  TbDeviceSpeaker,
  TbMessage2,
  TbUsersGroup,
} from "solid-icons/tb";
import {
  createEffect,
  createResource,
  For,
  Match,
  on,
  Show,
  Suspense,
  Switch,
  useContext,
} from "solid-js";
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
import { ChannelContext } from "~/lib/contexts/channel";
import { ServerContext } from "~/lib/contexts/server";
import { Label } from "~/components/ui/label.tsx";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar.tsx";
import { showToast } from "~/components/ui/toast.tsx";
import { Badge } from "~/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

export default function serverLayout(props: any) {
  const { server } = useContext(ServerContext);
  const { id, setId } = useContext(ChannelContext);

  const [membersList, { refetch: refreshMembers }] = createResource(
    async () => {
      return server()
        ?.fetchMembers(true)
        .catch((e) => {
          showToast({
            title: "Error",
            description: e.message,
            variant: "error",
          });
        });
    }
  );

  createEffect(
    on(server, () => {
      refreshMembers();
    })
  );

  return (
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
      <Flex justifyContent="start" flexDirection="row" class="w-full h-full">
        <Flex
          class="max-w-72 w-full h-full gap-2 p-2 overflow-auto"
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
                <Label>
                  <Badge variant={"outline"}>
                    {membersList()?.members?.length || 0} Online members
                  </Badge>
                </Label>
                <Sheet>
                  <SheetTrigger>
                    <Tooltip>
                      <TooltipTrigger as={Button<"button">} variant="outline">
                        <TbUsersGroup />
                      </TooltipTrigger>
                      <TooltipContent>Members List</TooltipContent>
                    </Tooltip>
                  </SheetTrigger>
                  <SheetContent
                    title="Members List"
                    position={"right"}
                    class="!p-0 overflow-x-hidden overflow-y-auto"
                  >
                    <div class="flex flex-col gap-2 p-4">
                      <Show
                        when={membersList()?.members}
                        fallback={
                          <div class="flex w-full h-full items-center justify-center">
                            <h1 class="text-xl font-bold">
                              Unable to fetch members...
                            </h1>
                          </div>
                        }
                      >
                        <For each={membersList()?.members}>
                          {(item) => (
                            <Flex
                              justifyContent="start"
                              alignItems="center"
                              class="p-2 bg-background border-2 border-muted rounded-md gap-2 shadow-sm"
                            >
                              <Avatar>
                                <AvatarImage src={item.avatarURL} />
                                <AvatarFallback>
                                  {item.user?.username.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div class="flex flex-col">
                                <p>{item.user?.displayName}</p>
                                <p>
                                  @{item.user?.username}#
                                  {item.user?.discriminator}
                                </p>
                              </div>
                            </Flex>
                          )}
                        </For>
                      </Show>
                    </div>
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
                                onClick={async () => {
                                  setId(channel.id);
                                }}
                                class="justify-start items-center w-full gap-2"
                                variant={
                                  id() === channel.id ? "default" : "outline"
                                }
                              >
                                <Show when={channel.iconURL && !channel.mature}>
                                  <img
                                    width={24}
                                    height={24}
                                    src={channel.iconURL}
                                    alt={channel.name}
                                  />
                                </Show>
                                <Show when={channel.iconURL && channel.mature}>
                                  <div class="relative">
                                    <img
                                      width={24}
                                      height={24}
                                      src={channel.iconURL}
                                      alt={channel.name}
                                    />
                                    <span class="absolute bg-background rounded-full bottom-0 right-0">
                                      <TbAlertCircle size={14} />
                                    </span>
                                  </div>
                                </Show>
                                <Show
                                  when={!channel.iconURL && !channel.mature}
                                >
                                  <Switch>
                                    <Match
                                      when={channel.type === "TextChannel"}
                                    >
                                      <TbMessage2 size={24} />
                                    </Match>
                                    <Match
                                      when={channel.type === "VoiceChannel"}
                                    >
                                      <TbDeviceSpeaker size={24} />
                                    </Match>
                                  </Switch>
                                </Show>
                                <Show when={!channel.iconURL && channel.mature}>
                                  <Switch>
                                    <Match
                                      when={channel.type === "TextChannel"}
                                    >
                                      <div class="relative">
                                        <TbMessage2 size={24} />
                                        <span class="absolute bg-background rounded-full bottom-0 right-0">
                                          <TbAlertCircle size={14} />
                                        </span>
                                      </div>
                                    </Match>
                                    <Match
                                      when={channel.type === "VoiceChannel"}
                                    >
                                      <div class="relative">
                                        <TbMessage2 size={24} />
                                        <span class="absolute bg-background rounded-full bottom-0 right-0">
                                          <TbDeviceSpeaker size={14} />
                                        </span>
                                      </div>
                                    </Match>
                                  </Switch>
                                </Show>
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
        <div class="w-full h-full">{props.children}</div>
      </Flex>
    </Suspense>
  );
}
