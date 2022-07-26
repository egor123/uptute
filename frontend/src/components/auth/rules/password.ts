import { vm } from "@/main";
import { Rules } from "../types";
import { password as config } from "../config";

const rules: Rules<string> = [
  (v: string) => !!v || vm.$l("auth.rules.password.require"),
  (v: string) => (v || "").indexOf(" ") < 0 || vm.$l("auth.rules.no_spaces"),
  (v: string) =>
    (v && v.length >= config.length.min) ||
    vm.$l("auth.rules.password.length.min", {
      n: config.length.min,
    }),
  (v: string) =>
    (v && v.length <= config.length.max) ||
    vm.$l("auth.rules.password.length.max", { n: config.length.max }),
];

export default rules;
