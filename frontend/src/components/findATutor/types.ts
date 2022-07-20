import { Language, Subject } from "@/types";

export interface Img {
  name: string;
  imgUrl: string;
}

export type Age = [number, number];

export interface IsError {
  color: boolean;
  animation: boolean;
}

export interface Filters {
  subject: Filter<Subject>;
  topic: Filter<string>;
  details: Filter<string>;
  imgs: Filter<Img[]>;
  languages: Filter<Language[]>;
  age: Filter<[number, number]>;
  price: Filter<[number, number]>;
}

export interface Filter<T> {
  value: T;
  default: T;
  isError: IsError;
  rules: Rules<T>;
}

export type Rules<T> = (v: T) => boolean;
