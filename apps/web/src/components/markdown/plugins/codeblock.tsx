import { JSX } from "solid-js"

export function RenderCodeblock(props: {
  children: JSX.Element,
  class?: string
}) {
  return <pre class="bg-black font-mono text-white rounded-md">{props.children}</pre>
}