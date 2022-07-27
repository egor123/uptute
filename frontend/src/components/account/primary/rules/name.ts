import { vm } from "@/main";
import { Validated } from "@/types";
import { name as config } from "../config";

export default (v: string): Validated => {
  let [ifSuccess, msg] = [true, ""];

  if (v.length > config.length.max)
    [ifSuccess, msg] = [
      false,
      vm.$l("rules.shared.max", { n: config.length.max }),
    ];
  if (v.length < config.length.min)
    [ifSuccess, msg] = [
      false,
      vm.$l("rules.shared.min", { n: config.length.min }),
    ];
  if (v.indexOf(" ") != -1)
    [ifSuccess, msg] = [false, vm.$l("rules.shared.spaces")];
  if (!v) [ifSuccess, msg] = [false, vm.$l("rules.shared.something")];

  return { ifSuccess, msg };
};
