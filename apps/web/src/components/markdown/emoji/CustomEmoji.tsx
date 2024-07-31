import { ComponentProps, splitProps } from "solid-js";


import { EmojiBase } from ".";
import { RevoltClient } from "~/lib/client";

/**
 * Display custom emoji
 */
export function CustomEmoji(
  props: { id: string } & Omit<
    ComponentProps<typeof EmojiBase>,
    "loading" | "class" | "draggable" | "src"
  >
) {
  const [local, remote] = splitProps(props, ["id"]);

  /**
   * Resolve emoji URL
   */
  const url = () =>
    `${RevoltClient?.configuration?.features.autumn.url}/emojis/${local.id}`;

  return (
    <EmojiBase
      {...remote}
      loading="lazy"
      class="emoji"
      draggable={false}
      src={url()}
      alt={`:${local.id}:`}
    />
  );
}
