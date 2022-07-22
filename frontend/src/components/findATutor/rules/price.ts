import { Validated } from "@/types";

export default (price: [number, number]): Validated => {
  price;
  return { ifSuccess: true, msg: "" };
};
