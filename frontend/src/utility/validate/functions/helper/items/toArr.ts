import {
  ValidatableField as V,
  ValidatableFieldsArr as VArr,
  ValidatableFields as VObj,
  IndexOfValidatableFields as VIndex,
} from "@/types";
import { ValidatableUnion } from "@/utility/validate/types";

function _toArr(v: ValidatableUnion): VArr {
  if (Array.isArray(v)) {
    if (isArrOfFields(v)) return v;
    else if (isFieldsObjArr(v)) return fieldsObjArrToArr(v);
    else throw new Error("ToArr does not take such payload as ", v);
  } else if (isValidatableField(v)) return [v];
  else if (isVObj(v)) return Object.values(v);
  else if (isVIndex(v)) return indexToArr(v);
  else throw new Error("ToArr does not take such payload as ", v);
}

const isArrOfFields = (v: VArr | VObj[]): v is VArr =>
  !v.some((val) => !isValidatableField(val));

const isFieldsObjArr = (v: VArr | VObj[]): v is VObj[] =>
  !v.some((val) => !isVObj(val));

const isValidatableField = (v: VObj | VIndex | V<any>): v is V<any> =>
  "value" in v ? true : false;

const isVObj = (v: VObj | VIndex | V<any>): v is VObj =>
  Object.values(v).every(isValidatableField);

const isVIndex = (v: VIndex): v is VIndex => Object.values(v).every(isVObj);

// -------

const fieldsObjArrToArr = (v: VObj[]): VArr =>
  v.map((obj) => Object.values(obj)).flat();

const indexToArr = (v: VIndex): VArr =>
  Object.values(v)
    .map((v) => Object.values(v))
    .flat();

export const toArr = _toArr;
