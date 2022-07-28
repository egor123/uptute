import { ValidatableField as V } from "@/types";
import { sleep } from "@/utility/methods";
import { clearErrorStyles, getErrMsg, isValidSingle } from "..";

export const animateError = async (v: V<unknown>) => {
  if (!isValidSingle(v)) {
    v.isError.animation = true;
    v.isError.color = true;
    v.isError.msg = getErrMsg(v);
    await sleep(100);
  } else clearErrorStyles(v);

  return;
};
