import { getErrMsg } from "..";
import { ValidatableField as V } from "@/types";

export const clearErrorStyles = (v: V<unknown>) => {
  v.isError.color = false;
  v.isError.msg = getErrMsg(v);
};
