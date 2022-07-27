import { ValidatableField } from "@/utility/classes/ValidatableField";
import { Details as D } from "../types";
import nameRules from "@/components/account/primary/rules/name";
import gradeRules from "@/components/account/student/rules/grade";
import birthdayRules from "@/components/account/primary/rules/birthday";
export module Details {
  export class All implements D.All {
    user = new User();
    student = new Student();
    tutor = new Tutor();
    getArr = () => [this.user, this.student, this.tutor];

    update(newDetails: Partial<this>): void {
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
    [index: string]: ValidatableField<D.Grade>;
    grade = new ValidatableField<D.Grade>(1, gradeRules);
  }

  const dummy = () => ({ ifSuccess: true, msg: "" });

  export class Tutor implements D.Tutor {
    [index: string]:
      | ValidatableField<string>
      | ValidatableField<D.Subject[]>
      | ValidatableField<[D.Grade, D.Grade]>
      | ValidatableField<D.Language[]>;
    moto = new ValidatableField<string>("", dummy);
    about = new ValidatableField<string>("", dummy);
    conferenceLink = new ValidatableField<string>("", dummy);
    subjects = new ValidatableField<D.Subject[]>([] as D.Subject[], dummy);
    audience = new ValidatableField<[D.Grade, D.Grade]>(
      [1, 12] as [D.Grade, D.Grade],
      dummy
    );
    languages = new ValidatableField<D.Language[]>([] as D.Language[], dummy);
  }
}
