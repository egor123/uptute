import { ValidatableField as V } from "@/types";

export const isValidSingle = (v: V<unknown>): boolean => {
  const r = v.rules(v.value);
  return typeof r === "object" ? r.ifSuccess : r;
};
