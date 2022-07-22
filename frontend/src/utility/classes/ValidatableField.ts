import { IsError, Rules, ValidatableField as vField } from "@/types";

export class ValidatableField<T> implements vField<T> {
  value: T;
  default: T;
  rules: Rules<T>;
  isError: IsError = { color: false, animation: false, msg: "" };

  constructor(def: T, rules: Rules<T>) {
    this.value = def;
    this.default = def;
    this.rules = rules;
  }
}
