import {
  ValidatableField,
  ValidatableFields,
  ValidatableFieldsArr,
} from "@/types";

export type ValidatableUnion =
  | ValidatableField<unknown>
  | ValidatableFieldsArr
  | ValidatableFields;
