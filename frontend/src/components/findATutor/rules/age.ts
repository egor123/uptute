import { Validated } from "@/types";
import { Age } from "../types";

export default (value: Age): Validated => {
  value;
  return { ifSuccess: true, msg: "" };
};
