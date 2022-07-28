import { ChildOfDetails, Details } from "@/components/account/types";
import {
  ValidatableField,
  ValidatableFields,
  ValidatableFieldsArr,
} from "@/types";

export type ValidatableUnion =
  | ValidatableField<unknown>
  | ValidatableFieldsArr
  | ValidatableFields;

export type Source = ChildOfDetails | Details.All;
