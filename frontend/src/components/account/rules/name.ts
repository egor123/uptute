import { rules, withErrMsg } from "../types";
import { ifPasses } from "./base";
// const requirements = { length: { max: 20, min: 3 } };
const [min, max] = [3, 20];

type Obj = withErrMsg & { isFirstName: boolean };
export const ifPassesNameRules = (v: string, obj: Obj) => {
  const title = obj.isFirstName ? "name" : "surname";

  const rules: rules = {
    ifNotNull: { condition: !!v, pathEnd: `${title}.require` },

    ifNoSpaces: { condition: v.indexOf(" ") < 0, pathEnd: `no_spaces` },

    ifMoreThanMin: {
      condition: v.length >= min,
      pathEnd: `${title}.length.min`,
      lParams: { n: min },
    },

    ifLessThanMax: {
      condition: v.length <= max,
      pathEnd: `${title}.length.max`,
      lParams: { n: max },
    },
  };

  return ifPasses(obj, rules);
};
