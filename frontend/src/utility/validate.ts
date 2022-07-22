import { ValidatableField as V, ValidatableFieldsArr as VArr } from "@/types";
import { sleep } from "./methods";

export async function isValid(v: VArr): Promise<Boolean>;
export async function isValid(v: V<any>): Promise<Boolean>;
export async function isValid(v: VArr | V<any>): Promise<Boolean> {
  const arr = Array.isArray(v) ? v : [v];

  const isValid = arr.every((v) => v.rules(v.value));

  for (const v of arr) v.isError.animation = false;

  await sleep(10); // For animation to always take effect

  for (const v of arr)
    if (isValid) v.isError.color = false;
    else await animateError(v);

  return isValid;
}

const animateError = async (v: V<unknown>) => {
  if (!v.rules(v.value)) {
    v.isError.animation = true;
    v.isError.color = true;
    await sleep(100);
  } else v.isError.color = false;

  return;
};
