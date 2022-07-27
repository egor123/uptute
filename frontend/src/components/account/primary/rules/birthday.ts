// import { vm } from "@/main";
import { Validated } from "@/types";

export default (v: string): Validated => {
  let [ifSuccess, msg] = [true, ""];

  if (v.length === 0) [ifSuccess, msg] = [false, ""];

  return { ifSuccess, msg };
};
