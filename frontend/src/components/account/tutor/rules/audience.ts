// import { vm } from "@/main";
import { Grade, Validated } from "@/types";

export default (v: [Grade, Grade]): Validated => {
  let [ifSuccess, msg] = [true, ""];

  return { ifSuccess, msg };
};
