import { vm } from "@/main";
import { Rules } from "../../types";
import Module from "@/store/modules/auth/credentials";

const rules: Rules<string> = [
  (v) => !!v || vm.$l("auth.rules.password.require"),
  (v) =>
    (v && v == Module.password) || vm.$l("auth.rules.password.not_matching"),
];

export default rules;
