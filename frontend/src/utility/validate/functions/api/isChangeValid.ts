import {
  ValidatableField as V,
  ValidatableFieldsArr as VArr,
  ValidatableFields as VObj,
} from "@/types";
import { areEqual } from "@/utility/methods";
import { ValidatableUnion as VUnion } from "../../types";
import { toArr } from "../helper";
import { isValid } from "./isValid";

async function _isChangeValid(newV: VArr, oldV: VArr): Promise<Boolean>;
async function _isChangeValid(newV: VObj, oldV: VObj): Promise<Boolean>;
async function _isChangeValid(newV: V<any>, oldV: V<any>): Promise<Boolean>;
async function _isChangeValid(newV: VUnion, oldV: VUnion): Promise<Boolean> {
  const newArr: VArr = toArr(newV);
  const oldArr: VArr = toArr(oldV);

  const hasChanged = (field: V<any>, id: number): boolean =>
    !areEqual(newArr[id].value, oldArr[id].value);

  const changedFields: VArr = newArr.filter(hasChanged);

  console.warn(changedFields);

  return await isValid(changedFields);
}

export const isChangeValid = _isChangeValid;
