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
export type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Subject =
  | "MATH"
  | "BIOL"
  | "ESL"
  | "PHYS"
  | "GEOG"
  | "CHEM"
  | "CIS";

export interface IsError {
  msg: string;
  color: boolean;
  animation: boolean;
}

// TODO Delete boolean return types
export type Validated = boolean | { ifSuccess: boolean; msg: string };

export type Rules<T> = (v: T) => Validated;

export interface Validatable<T> {
  value: T;
  isError: IsError;
  rules: Rules<T>;
}

export interface ValidatableField<T> extends Validatable<T> {
  default: T;
}

export interface ValidatableFields {
  [index: string]: ValidatableField<any>;
}

export type ValidatableFieldsArr = ValidatableField<unknown>[];

export interface Validatables {
  [index: string]: Validatable<unknown>;
}

export type ValidatablesArr = Validatable<unknown>[];

export interface VForm extends HTMLFormElement {
  reset(): void;
  resetValidation(): void;
  validate(): boolean;
}

export namespace ValidatableFieldUnion {
  export type User = ValidatableField<string>;
  export type Student = ValidatableField<Grade>;
  export type Tutor =
    | ValidatableField<string>
    | ValidatableField<Subject[]>
    | ValidatableField<[Grade, Grade]>
    | ValidatableField<Language[]>;
}

export interface IndexOfValidatableFields {
  [index: string]: ValidatableFields;
}
