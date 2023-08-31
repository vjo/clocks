import { createSignal, onCleanup } from "solid-js";
import { Hand } from "./Hand";
import { Lines } from "./Lines";
import { Numbers } from "./Numbers";
import { createAnimationLoop } from "./utils";
import type { Component } from "solid-js";
import styles from "./App.module.css";

const getSecondsSinceMidnight = (): number => (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;
const hours = 24;
const minutes = 60;

type ClockFaceProps = {
  currentHour: number;
  minute: string;
  second: string;
};

export const ClockFace: Component<ClockFaceProps> = (props) => (
  <svg viewBox="0 0 200 200" width="70vh">
    <g transform="translate(100, 100)">
      {/* static */}
      <circle class="text-neutral-900" r="99" fill="white" stroke="currentColor" />
      <Lines numberOfLines={minutes} class={styles.minute} length={8} />
      <Numbers numberOfLines={hours} currentHour={props.currentHour} />
      {/* dynamic */}
      <Hand rotate={props.minute} class={styles.minute} length={65} width={3} />
      <Hand rotate={props.second} class={styles.second} length={80} width={2} />
    </g>
  </svg>
);

export const Clock: Component = () => {
  const [time, setTime] = createSignal<number>(getSecondsSinceMidnight());
  const dispose = createAnimationLoop(() => {
    setTime(getSecondsSinceMidnight());
  });
  onCleanup(dispose);

  const rotate = (rotate: number, fixed: number = 1) => `rotate(${(rotate * 360).toFixed(fixed)})`;

  const second = () => rotate((time() % 60) / 60);
  const minute = () => rotate(((time() / 60) % 60) / 60);
  const currentHour = () => Math.trunc(time() / 60 / 60);

  return <ClockFace currentHour={currentHour()} minute={minute()} second={second()} />;
};
