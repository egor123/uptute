import { rule, rules, withErrMsg } from "../types";
import { ruleBase } from "@/utility/methods.js";

export const ifPasses = (obj: withErrMsg, rules: rules): boolean => {
  const check = ({ condition, pathEnd, lParams }: rule) =>
    ruleBase({ obj, condition, pathEnd, lParams });

  obj.errMsg = "";

  for (const rule of Object.values(rules)) if (!check(rule)) return false;

  return true;
};
