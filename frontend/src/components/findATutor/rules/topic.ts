import { Validated } from "@/types";
import { vm } from "@/main";

export default (value: string): Validated => {
  let [ifSuccess, msg] = [true, ""];
  if (value == null || value.length === 0)
    [ifSuccess, msg] = [false, vm.$l("rules.shared.something")];
  return { ifSuccess, msg };
};
