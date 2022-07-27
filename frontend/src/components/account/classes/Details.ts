import { ValidatableField } from "@/utility/classes/ValidatableField";
import { Details as D } from "../types";
import nameRules from "@/components/account/primary/rules/name";
import birthdayRules from "@/components/account/primary/rules/birthday";
export module Details {
  export class All implements D.All {
    userDetails = new User();
    studentDetails = new Student();
    tutorDetails = new Tutor();

    update(newDetails: Partial<this>) {
      for (const key in this)
        if (newDetails[key]) this[key] = { ...this[key], ...newDetails[key] };
    }
  }

  export class User implements D.User {
    [index: string]: ValidatableField<string>;
    firstName = new ValidatableField<string>("", nameRules);
    lastName = new ValidatableField<string>("", nameRules);
    birthday = new ValidatableField<string>("", birthdayRules);
  }

  export class Student implements D.Student {
    grade = 1 as D.Grade;
  }

  export class Tutor implements D.Tutor {
    moto = "";
    about = "";
    conferenceLink = "";
    subjects = [] as D.Subject[];
    audience = [1, 12] as [D.Grade, D.Grade];
    languages = [] as D.Language[];
  }
}
