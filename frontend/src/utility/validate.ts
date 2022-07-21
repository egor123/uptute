import { Validatable, ValidatablesArr } from "@/types";
import { sleep } from "./methods";

export const isValid = async (vArr: ValidatablesArr): Promise<Boolean> => {
  const isValid = vArr.every((v) => v.rules(v.value));

  if (isValid) {
    clearErrorStyles(vArr);
    return true;
  } else {
    await animateErrors(vArr);
    return false;
  }
};

const clearErrorStyles = async (vArr: Validatable<unknown>[]) => {
  for (const v of vArr) {
    v.isError.animation = false;
    v.isError.color = false;
  }
};

const animateErrors = async (vArr: Validatable<unknown>[]) => {
  for (const v of vArr) v.isError.animation = false;

  await sleep(10);

  for (const v of vArr) {
    if (!v.rules(v.value)) {
      v.isError.animation = true;
      v.isError.color = true;
      await sleep(100);
    } else v.isError.color = false;
  }

  return;
};
