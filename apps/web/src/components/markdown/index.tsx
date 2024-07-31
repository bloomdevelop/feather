import { createEffect, createSignal, on } from "solid-js";

import "katex/dist/katex.min.css";
import { html } from "property-information";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { VFile } from "vfile";

import { injectEmojiSize } from "./emoji/util.ts";
import { RenderCodeblock } from "./plugins/codeblock.tsx";
import { RenderAnchor } from "./plugins/anchors.tsx";
import { remarkHtmlToText } from "./plugins/htmlToText.ts";
import {
  RenderSpoiler,
  remarkSpoiler,
  spoilerHandler,
} from "./plugins/spoiler.tsx";
import { remarkInsertBreaks, sanitise } from "./sanitise.ts";
import { childrenToSolid } from "./solid-markdown/ast-to-solid.tsx";
import { defaults } from "./solid-markdown/defaults.ts";
import { RenderCodeInline } from "./plugins/codeInline.tsx";

/**
 * Empty component
 */
const Null = () => null;

/**
 * Custom Markdown components
 */
const components = () => ({
  // uemoji: RenderUnicodeEmoji,
  // cemoji: RenderCustomEmoji,
  // mention: RenderMention,
  // channel: RenderChannel,
  spoiler: RenderSpoiler,

  a: RenderAnchor,
  pre: RenderCodeblock,
  code: RenderCodeInline,

  // Block image elements
  img: Null,
  // Catch literally everything else just in case
  video: Null,
  figure: Null,
  picture: Null,
  source: Null,
  audio: Null,
  script: Null,
  style: Null,
});

/**
 * Unified Markdown renderer
 */
const pipeline = unified()
  .use(remarkParse)
  .use(remarkBreaks)
  .use(remarkGfm)
  .use(remarkMath, {
    // TODO: fork for \[\] support
    singleDollarTextMath: false,
  })
  // .use(remarkUnicodeEmoji)
  // .use(remarkCustomEmoji)
  .use(remarkSpoiler)
  .use(remarkHtmlToText)
  // @ts-expect-error non-standard elements not recognised by typing
  .use(remarkRehype, {
    handlers: {
      spoiler: spoilerHandler,
    },
  })
  .use([remarkInsertBreaks])
  .use(rehypeKatex, {
    maxSize: 10,
    maxExpand: 2,
    trust: false,
    strict: false,
    output: "html",
    errorColor: "var(--danger)",
  })
  .use(rehypeHighlight);

export interface MarkdownProps {
  /**
   * Content to render
   */
  content?: string;

  /**
   * Whether to prevent big emoji from rendering
   */
  disallowBigEmoji?: boolean;
}

export { TextWithEmoji } from "./emoji/TextWithEmoji.tsx";
export { Emoji } from "./emoji/Emoji.tsx";

/**
 * Remark renderer component
 */
export function Markdown(props: MarkdownProps) {
  /**
   * Render some given Markdown content
   * @param content content
   */
  function render(content: string = "") {
    const file = new VFile();
    file.value = sanitise(content);

    const hastNode = pipeline.runSync(pipeline.parse(file), file);

    if (hastNode.type !== "root") {
      throw new TypeError("Expected a `root` node");
    }

    injectEmojiSize(props, hastNode as any);

    return childrenToSolid(
      {
        options: {
          ...defaults,
          components: components(),
        },
        schema: html,
        listDepth: 0,
      },
      hastNode
    );
  }

  // Render once immediately
  const [children, setChildren] = createSignal(render(props.content));

  // If it ever updates, re-render the whole tree:
  createEffect(
    on(
      () => props.content,
      (content) => setChildren(render(content)),
      { defer: true }
    )
  );

  // Give it to Solid:
  return <div class="prose prose-neutral dark:prose-invert">{children()}</div>;
}
