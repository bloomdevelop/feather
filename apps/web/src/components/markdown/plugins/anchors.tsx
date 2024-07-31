import { JSX, splitProps } from "solid-js";

export function RenderAnchor(
  props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  const [localProps, remoteProps] = splitProps(props, ["href"]);

  if (!localProps.href) return <a href={localProps.href} {...props} />;

  return (
    <a
      {...remoteProps}
      class="text-blue-500"
      href={localProps.href}
      target="_blank"
      rel="noreferrer"
    />
  );
}
