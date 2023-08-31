import { Hand } from "./Hand";
import { Component, splitProps, For } from "solid-js";

type LinesProps = {
  numberOfLines: number;
  class: string;
  length: number;
};

const rotate = (index: number, length: number) => `rotate(${(360 * index) / length})`;

export const Lines: Component<LinesProps> = (props) => {
  const [local, rest] = splitProps(props, ["length", "numberOfLines"]);

  return (
    <For each={new Array(local.numberOfLines)}>
      {(_, index) => (
        <Hand
          width={1}
          rotate={rotate(index(), local.numberOfLines)}
          fixed={true}
          length={index() % 5 === 0 ? local.length + 5 : local.length}
          {...rest}
        />
      )}
    </For>
  );
};
