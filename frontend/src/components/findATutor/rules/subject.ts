import { Validated } from "@/types";
import { Subject } from "@/types";

export default (subject: Subject): Validated => {
  return { ifSuccess: subject != null, msg: "" };
};
