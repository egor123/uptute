import { Language, Subject, ValidatableField as Field } from "@/types";

export interface Img {
  name: string;
  imgUrl: string;
}

export type Age = [number, number];

export interface Filters {
  subject: Field<Subject>;
  topic: Field<string>;
  details: Field<string>;
  imgs: Field<Img[]>;
  languages: Field<Language[]>;
  age: Field<[number, number]>;
  price: Field<[number, number]>;
}
