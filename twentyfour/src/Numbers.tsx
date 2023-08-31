import { Component, splitProps, For } from "solid-js";

type NumbersProps = {
  currentHour: number;
  numberOfLines: number;
};

const rotate = (index: number, length: number) => `rotate(${(360 * index) / length})`;

export const Numbers: Component<NumbersProps> = (props) => {
  return (
    <For each={new Array(props.numberOfLines)}>
      {(_, index) => (
        <Number index={index()} rotate={rotate(index(), props.numberOfLines)} current={index() === props.currentHour} />
      )}
    </For>
  );
};

type NumberProps = {
  current: boolean;
  index: number;
  rotate: string;
};

const Number: Component<NumberProps> = (props) => (
  <g transform={props.rotate}>
    <text x="-2.5" y="-90" fill={props.current ? "#000" : "#CCC"} font-weight={props.current ? "bold" : "normal"}>
      {props.index}
    </text>
  </g>
);
