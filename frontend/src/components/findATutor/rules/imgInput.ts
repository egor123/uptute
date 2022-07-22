import { Validated } from "@/types";
import { Img } from "../types";

export default (value: Img[]): Validated => {
  value;
  return { ifSuccess: true, msg: "" };
};
