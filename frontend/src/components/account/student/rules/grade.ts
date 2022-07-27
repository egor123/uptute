// import { vm } from "@/main";
import { Details } from "@/components/account/types";
import { Validated } from "@/types";

export default (v: Details.Grade): Validated => {
  let [ifSuccess, msg] = [true, ""];

  return { ifSuccess, msg };
};
