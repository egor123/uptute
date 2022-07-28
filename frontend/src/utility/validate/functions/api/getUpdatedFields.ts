import { ValidatableFields as VObj } from "@/types";

function _getUpdatedFields(old: VObj, key: string, value: any) {
  return { ...old, [key]: { ...old[key], value } };
}

export const getUpdatedFields = _getUpdatedFields;
