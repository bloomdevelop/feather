import { JSX } from "solid-js"

export function RenderCodeInline(props: {
  children: JSX.Element,
  class?: string
}) {
  return <code class="after:content-none before:content-none bg-black p-1 font-mono text-white rounded-md">{props.children}</code>
}