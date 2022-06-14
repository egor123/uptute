export interface SwipeEventCallback {
  (move: Vector, status: SwipeStatus): void;
}
export type SwipeStatus = "start" | "move" | "end";

export interface SwipedEventCallback {
  (direction: Direction): void;
}

export interface Vector {
  x: number;
  y: number;
}

export interface PromiseRes<T = unknown> {
  (value: T): void;
}

export type Direction = "right" | "left" | "up" | "down";
