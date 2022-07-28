// import { vm } from "@/main";
import { Validated } from "@/types";

export default (v: string): Validated => {
  v;
  let [ifSuccess, msg] = [true, ""];

  return { ifSuccess, msg };
};
