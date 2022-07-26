import { vm } from "@/main";
import { Rules } from "../types";

const rules: Rules<string> = [
  (v: string) => !!v || vm.$l("auth.rules.email.require"),
  (v: string) => (v || "").indexOf(" ") < 0 || vm.$l("auth.rules.no_spaces"),
  (v: string) => /.+@.+\..+/.test(v) || vm.$l("auth.rules.email.valid"),
];

export default rules;
