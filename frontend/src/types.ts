import { IsError, Rules } from "@/components/findATutor/types";

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

export type Language = "EN" | "EST" | "RU";

export type Subject =
  | "MATH"
  | "BIOL"
  | "ESL"
  | "PHYS"
  | "GEOG"
  | "CHEM"
  | "CIS";

export interface Validatable<T> {
  isError: IsError;
  value: T;
  rules: Rules<T>;
}

export type ValidatablesArr = Validatable<unknown>[];
