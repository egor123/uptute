import { Language } from "@/types";
import { vm } from "@/main";
import { Validated } from "@/types";

export default (languages: Language[]): Validated => {
  let [ifSuccess, msg] = [true, ""];
  if (languages.length < 1)
    [ifSuccess, msg] = [false, vm.$l("rules.shared.one")];
  return { ifSuccess, msg };
};
