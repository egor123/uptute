interface Obj<T> {
  value: T;
  default: T;
}

export interface TitleObj extends Obj<string> {}

export interface Button {
  text: string;
  name: string;
}
export interface ButtonsObj extends Obj<Button[]> {}

export interface ColorObj extends Obj<string> {}
