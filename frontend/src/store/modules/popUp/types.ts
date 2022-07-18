export type Value = string | boolean;

export interface Button {
  text: string;
  value: Value;
}

export interface Props {
  title: string;
  buttons: Button[];
  backgroundColor: string;
  color: string;
}
