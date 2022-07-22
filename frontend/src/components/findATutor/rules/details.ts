import { vm } from "@/main";
import { Validated } from "@/types";

export default (value: string): Validated => {
  let [ifSuccess, msg] = [true, ""];
  if (value == null || value.length === 0)
    [ifSuccess, msg] = [false, vm.$l("rules.shared.something")];
  return { ifSuccess, msg };
};
