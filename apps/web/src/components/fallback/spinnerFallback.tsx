import { splitProps } from "solid-js";

export type SpinnerFallbackProps = {
  size: number;
  strokeSize?: number;
};

export default function SpinnerFallback(props: SpinnerFallbackProps) {
  const [, rest] = splitProps(props, ["size"]);
  return (
    <div
      {...rest}
      class="w-full h-full flex justify-center items-center text-4xl font-bold"
    >
      <svg
        {...rest}
        class={`h-${props.size} w-${props.size} animate-spin`}
        viewBox="0 0 100 100"
      >
        <circle
          fill="none"
          stroke-width={`${props.strokeSize ?? 10}`}
          class="stroke-muted"
          cx="50"
          cy="50"
          r="40"
        />
        <circle
          fill="none"
          stroke-width={`${props.strokeSize ?? 10}`}
          class="stroke-muted-foreground"
          stroke-dasharray="250"
          stroke-dashoffset="210"
          cx="50"
          cy="50"
          r="40"
        />
      </svg>
    </div>
  );
}
