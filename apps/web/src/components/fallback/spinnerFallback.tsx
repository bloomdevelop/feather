import { splitProps } from "solid-js";

export type SpinnerFallbackProps = {
  size: number;
  strokeSize?: number;
};

export default function SpinnerFallback(props: SpinnerFallbackProps) {
  const [, rest] = splitProps(props, ["size"]);
  return (
    <div class="w-full h-full flex justify-center items-center">
      <svg
        {...rest}
        style={{
          width: `${props.size}px`,
          height: `${props.size}px`,
        }}
        class={"animate-spin"}
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
