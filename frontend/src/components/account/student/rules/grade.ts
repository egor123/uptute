// import { vm } from "@/main";
import { Details } from "@/components/account/types";
import { Grade, Validated } from "@/types";

export default (v: Grade): Validated => {
  let [ifSuccess, msg] = [true, ""];

  return { ifSuccess, msg };
};
