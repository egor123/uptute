import { vm } from "@/main";
import { Validated } from "@/types";

export default (v: string): Validated => {
  let [ifSuccess, msg] = [true, ""];

  if (!v.match(/https?:\/\//))
    [ifSuccess, msg] = [false, vm.$l("rules.shared.valid")];
  if (!v || v.length < 0)
    [ifSuccess, msg] = [false, vm.$l("rules.shared.something")];

  return { ifSuccess, msg };
};
