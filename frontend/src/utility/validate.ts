import {
  ValidatableField as V,
  ValidatableFieldsArr as VArr,
  ValidatableFields as VObj,
} from "@/types";
import { sleep } from "./methods";
import { ValidatableUnion } from "./types";

export async function isValid(v: VArr): Promise<Boolean>;
export async function isValid(v: VObj): Promise<Boolean>;
export async function isValid(v: V<any>): Promise<Boolean>;
export async function isValid(v: ValidatableUnion): Promise<Boolean> {
  const arr: VArr = toArr(v);

  const isValid = arr.every(isValidSingle);

  for (const v of arr) v.isError.animation = false;

  await sleep(10); // For animation to always take effect

  for (const v of arr)
    if (isValid) clearErrorStyles(v);
    else await animateError(v);

  return isValid;
}

const isValidatableField = (v: VObj | V<any>): v is VObj =>
  "value" in v ? true : false;

const toArr = (v: VArr | VObj | V<any>): VArr =>
  Array.isArray(v) ? v : isValidatableField(v) ? [v] : Object.values(v);

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

export async function isChangeValid(newV: VArr, oldV: VArr): Promise<Boolean>;
export async function isChangeValid(newV: VObj, oldV: VObj): Promise<Boolean>;
export async function isChangeValid(
  newV: V<any>,
  oldV: V<any>
): Promise<Boolean>;
export async function isChangeValid(
  newV: ValidatableUnion,
  oldV: ValidatableUnion
): Promise<Boolean> {
  const newArr: VArr = toArr(newV);
  const oldArr: VArr = toArr(oldV);

  const dif = (field: V<any>, id: number) => field.value !== oldArr[id].value;

  const changedFields: VArr = newArr.filter(dif);

  return await isValid(changedFields);
}
