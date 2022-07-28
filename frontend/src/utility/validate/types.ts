import { ChildOfDetails, Details } from "@/components/account/types";
import {
  ValidatableField,
  ValidatableFields,
  ValidatableFieldsArr,
  IndexOfValidatableFields,
} from "@/types";

export type ValidatableUnion =
  | IndexOfValidatableFields
  | ValidatableFields[]
  | ValidatableFields
  | ValidatableFieldsArr
  | ValidatableField<unknown>;

export type Source = ChildOfDetails | Details.All;
