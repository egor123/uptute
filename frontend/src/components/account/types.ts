export interface NameObject {
  value: string;
  isFirstName: boolean;
  // propName: string;
  errMsg: string;
}

export interface NameConstructorPayload {
  isFirstName: boolean;
}

export declare module Details {
  interface User {
    birthday: string;
    firstName: string;
    lastName: string;
  }

  type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  interface Student {
    grade: Grade;
  }

  type Subject = string; //TODO certain strings only
  type Language = string; // TODO certain strings only

  interface Tutor {
    moto: string;
    about: string;
    conferenceLink: string;
    subjects: Subject[];
    audience: [Grade, Grade];
    languages: Language[];
  }

  interface All {
    userDetails: User;
    studentDetails?: Student;
    tutorDetails?: Tutor;
  }
}

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
