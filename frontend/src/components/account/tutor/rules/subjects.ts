// import { vm } from "@/main";
import { Subject, Validated } from "@/types";

export default (v: Subject[]): Validated => {
  let [ifSuccess, msg] = [true, ""];

  if (v.length === 0) ifSuccess = false;

  return { ifSuccess, msg };
};
