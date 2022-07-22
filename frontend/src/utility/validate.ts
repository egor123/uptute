import { ValidatableField as V, ValidatableFieldsArr as VArr } from "@/types";
import { sleep } from "./methods";

export async function isValid(v: VArr): Promise<Boolean>;
export async function isValid(v: V<any>): Promise<Boolean>;
export async function isValid(v: VArr | V<any>): Promise<Boolean> {
  const arr = Array.isArray(v) ? v : [v];

  const isValid = arr.every(isValidSingle);

  for (const v of arr) v.isError.animation = false;

  await sleep(10); // For animation to always take effect

  for (const v of arr)
    if (isValid) clearErrorStyles(v);
    else await animateError(v);

  return isValid;
}

const animateError = async (v: V<unknown>) => {
  if (!isValidSingle(v)) {
    v.isError.animation = true;
    v.isError.color = true;
    v.isError.msg = getErrMsg(v);
    await sleep(100);
  } else clearErrorStyles(v);

  return;
};

const isValidSingle = (v: V<unknown>): boolean => {
  const r = v.rules(v.value);
  return typeof r === "object" ? r.ifSuccess : r;
};

const getErrMsg = (v: V<unknown>): string => {
  const r = v.rules(v.value);
  return typeof r === "object" ? r.msg : "";
};

const clearErrorStyles = (v: V<unknown>) => {
  v.isError.color = false;
  v.isError.msg = getErrMsg(v);
};