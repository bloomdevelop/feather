import { Match, Switch, createSignal, onMount } from "solid-js";

import { CustomEmoji, Emoji, RE_CUSTOM_EMOJI } from "../emoji";

import {
  CustomComponentProps,
  createRegexComponent,
} from "./remarkRegexComponent";
import { Flex } from "~/components/ui/flex";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { RevoltClient } from "~/lib/client";
import { styled } from "solid-styled-components";

/**
 * Render a custom emoji
 *
 * This will also display a tooltip and fallback to text if the emoji doesn't exist.
 */
export function RenderCustomEmoji(props: CustomComponentProps) {
  const [exists, setExists] = createSignal(true);

  /**
   * Resolve emoji
   */
  const emoji = () => RevoltClient!.emojis.get(props.match);

  /**
   * Resolve server
   */
  const server = () =>
    RevoltClient!.servers.get(
      (emoji()!.parent as { type: "Server"; id: string }).id
    )!;

  return (
    <Switch fallback={<span>{`:${emoji()?.name ?? props.match}:`}</span>}>
      <Match when={exists()}>
        <TooltipTrigger
          // @ts-ignore
          use:floating={{
            tooltip: {
              placement: "top",
              content: () => (
                <Flex flexDirection="row" alignItems="center" class="gap-2">
                  <span style={{ "--emoji-size": "3em" }}>
                    <Emoji emoji={props.match} />
                  </span>
                  <Switch
                    fallback={
                      <>
                        Unknown emote
                        <FetchEmote id={props.match} />
                      </>
                    }
                  >
                    <Match when={emoji()?.parent.type === "Server"}>
                      <Flex flexDirection="col" alignItems="center">
                        <span>{`:${emoji()!.name}:`}</span>
                        <Switch fallback="Private Server">
                          <Match when={server()}>
                            <Flex flexDirection="row" alignItems="center" class="gap-2">
                              <Avatar
                              >
                                <AvatarImage src={server().animatedIconURL} />
                                <AvatarFallback>
                                  {server().name.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                            </Flex>
                          </Match>
                        </Switch>
                      </Flex>
                    </Match>
                  </Switch>
                </Flex>
              ),
              aria:
                emoji()?.parent.type === "Server"
                  ? `:${emoji()!.name}: from ${
                      server()?.name ?? "Private Server"
                    }`
                  : "Unknown emote",
            },
          }}
        >
          <CustomEmoji id={props.match} onError={() => setExists(false)} />
        </TooltipTrigger>
      </Match>
    </Switch>
  );
}

/**
 * Container for trigger
 */
const TooltipTrigger = styled.div`
  display: inline-block;
`;

/**
 * Helper to fetch unknown emotes
 */
function FetchEmote(props: { id: string }) {
  onMount(() => RevoltClient.emojis.fetch(props.id));
  return null;
}

export const remarkCustomEmoji = createRegexComponent(
  "cemoji",
  RE_CUSTOM_EMOJI
);
