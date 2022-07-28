import {
  ValidatableField as V,
  ValidatableFieldsArr as VArr,
  ValidatableFields as VObj,
} from "@/types";

import { sleep } from "@/utility/methods";

export const toArr = (v: VArr | VObj | V<any>): VArr =>
  Array.isArray(v) ? v : isValidatableField(v) ? [v] : Object.values(v);

const isValidatableField = (v: VObj | V<any>): v is VObj =>
  "value" in v ? true : false;

export const isValidSingle = (v: V<unknown>): boolean => {
  const r = v.rules(v.value);
  return typeof r === "object" ? r.ifSuccess : r;
};

export const animateError = async (v: V<unknown>) => {
  if (!isValidSingle(v)) {
    v.isError.animation = true;
    v.isError.color = true;
    v.isError.msg = getErrMsg(v);
    await sleep(100);
  } else clearErrorStyles(v);

  return;
};

export const clearErrorStyles = (v: V<unknown>) => {
  v.isError.color = false;
  v.isError.msg = getErrMsg(v);
};

const getErrMsg = (v: V<unknown>): string => {
  const r = v.rules(v.value);
  return typeof r === "object" ? r.msg : "";
};
