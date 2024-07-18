import {TbAlertCircle, TbInfoCircle} from "solid-icons/tb";
import {Match, Switch, useContext, For, createEffect, Show} from "solid-js";
import {Alert, AlertDescription, AlertTitle} from "~/components/ui/alert";
import {AspectRatio} from "~/components/ui/aspect-ratio";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {Flex} from "~/components/ui/flex";
import {ChannelContext} from "~/utils/contexts/channel";
import {ServerContext} from "~/utils/contexts/server";
import {Card, CardHeader, CardTitle} from "~/components/ui/card";
import {messageSignal, setMessageSignal} from "~/utils/messaging";
import {showToast} from "~/components/ui/toast";

export default function serverPage() {
    const {server} = useContext(ServerContext);
    const { channel } = useContext(ChannelContext);
    
    createEffect(async() => {
            if (server() &&!channel()) {
                setMessageSignal([]);
            } else {
                try {
                    // @ts-ignore
                    const { messages } = await channel()?.fetchMessagesWithUsers({ limit: 100 })
                    setMessageSignal(messages);
                }
                catch (e: any) {
                    showToast({
                        title: "Error",
                        description: e.message,
                        variant: "error",
                    });
                }
            }
        });

    return (
        <Switch
            fallback={
                <Alert>
                    <TbAlertCircle/>
                    <AlertTitle>Login Required</AlertTitle>
                    <AlertDescription>
                        You need to be logged in to view this server.
                    </AlertDescription>
                </Alert>
            }
        >
            <Match when={server() && !channel()}>
                <Flex
                    flexDirection="col"
                    class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 gap-4"
                >
                    <Switch>
                        <Match when={server()?.bannerURL}>
                            <AspectRatio ratio={16 / 9} class="relative">
                                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"/>
                                <img
                                    src={server()?.bannerURL}
                                    alt={`${server()?.name}'s banner`}
                                    class="size-full rounded-md object-cover image-render-edge"
                                />
                                <div
                                    class="absolute flex flex-row gap-2 top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-md">
                                    {server()?.name} {server()?.owner && `by ${server()?.owner?.username}`}
                                </div>
                            </AspectRatio>
                        </Match>
                        <Match when={server()?.bannerURL == null}>
                            <h1 class="text-2xl font-bold text-center">{server()?.name}</h1>
                            <Show when={server()?.owner}>
                                <Flex justifyContent="center" alignItems="center" class="gap-2">
                                    <Avatar>
                                        <AvatarImage src={server()?.owner?.avatarURL}/>
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
                        <TbInfoCircle/>
                        <AlertTitle>How to open channels?</AlertTitle>
                        <AlertDescription>
                            To enter a channel, open a category and select a channel inside a
                            category.
                        </AlertDescription>
                    </Alert>
                </Flex>
            </Match>
            <Match when={channel()}>
                <Flex class="w-full h-screen overflow-x gap-2">
                    <For each={messageSignal()}>
                        {(message) => (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{message.author?.displayName}</CardTitle>
                                </CardHeader>
                            </Card>
                        )}
                    </For>
                </Flex>
            </Match>
        </Switch>
    );
}
