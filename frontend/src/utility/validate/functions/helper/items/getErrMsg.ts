import { ValidatableField as V } from "@/types";

export const getErrMsg = (v: V<unknown>): string => {
  const r = v.rules(v.value);
  return typeof r === "object" ? r.msg : "";
};
