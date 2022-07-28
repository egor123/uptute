import {
  ValidatableField,
  ValidatableFields,
  Language,
  Subject,
  Grade,
} from "@/types";

export interface NameConstructorPayload {
  isFirstName: boolean;
}

export declare module Details {
  interface All {
    user: User;
    student?: Student;
    tutor?: Tutor;
    update: (newDetails: Partial<this>) => void;
    getArr: () => (User | Student | Tutor)[];
  }
  type keyofAll = "user" | "student" | "tutor";

  interface User extends ValidatableFields {
    birthday: ValidatableField<string>;
    firstName: ValidatableField<string>;
    lastName: ValidatableField<string>;
  }
  type keyofUser = "birthday" | "firstName" | "lastName";

  interface Student extends ValidatableFields {
    grade: ValidatableField<Grade>;
  }

  interface Tutor extends ValidatableFields {
    moto: ValidatableField<string>;
    about: ValidatableField<string>;
    conferenceLink: ValidatableField<string>;
    subjects: ValidatableField<Subject[]>;
    audience: ValidatableField<[Grade, Grade]>;
    languages: ValidatableField<Language[]>;
  }
}

export type ChildOfDetails = Details.User | Details.Student | Details.Tutor;

export interface withErrMsg {
  errMsg: string;
}

export interface rule {
  condition: boolean;
  pathEnd: string;
  lParams?: { [index: string]: string | number };
}

export interface rules {
  [index: string]: rule;
}

export type PanelAction = "isValid" | "refresh";

export type Rules<T = string> = (v: T) => boolean;
