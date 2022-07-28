// import { vm } from "@/main";
import { Language, Validated } from "@/types";

export default (v: Language[]): Validated => {
  let [ifSuccess, msg] = [true, ""];

  if (v.length === 0) ifSuccess = false;

  return { ifSuccess, msg };
};
