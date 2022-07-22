import { rules, withErrMsg } from "../types";
import { ifPasses } from "./base";

export const ifPassesLinkRules = (v: string, obj: withErrMsg): boolean => {
  const rules: rules = {
    ifNotNull: { condition: !!v && v.length > 0, pathEnd: "link.require" },
    ifHasHttp: { condition: !!v.match(/https?:\/\//), pathEnd: "link.valid" },
  };

  return ifPasses(obj, rules);
};
