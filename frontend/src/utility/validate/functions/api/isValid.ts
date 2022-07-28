import {
  ValidatableField as V,
  ValidatableFieldsArr as VArr,
  ValidatableFields as VObj,
  IndexOfValidatableFields as VIndex,
} from "@/types";
import { sleep } from "@/utility/methods";
import { ValidatableUnion as VUnion } from "../../types";
import {
  animateError,
  clearErrorStyles,
  isValidSingle,
  toArr,
} from "../helper";

async function _isValid(v: VIndex): Promise<Boolean>;
async function _isValid(v: VObj[]): Promise<Boolean>;
async function _isValid(v: VArr): Promise<Boolean>;
async function _isValid(v: VObj): Promise<Boolean>;
async function _isValid(v: V<any>): Promise<Boolean>;
async function _isValid(v: VUnion): Promise<Boolean> {
  const arr: VArr = toArr(v);

  const isValid = arr.every(isValidSingle);

  for (const v of arr) v.isError.animation = false;

  await sleep(10); // For animation to always take effect

  for (const v of arr)
    if (isValid) clearErrorStyles(v);
    else await animateError(v);

  return isValid;
}

export const isValid = _isValid;
