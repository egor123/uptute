import { ValidatableField } from "@/utility/classes/ValidatableField";
import { ValidatableField as VField, ValidatableFieldUnion } from "@/types";
import { Details as D } from "../types";
import nameRules from "@/components/account/primary/rules/name";
import gradeRules from "@/components/account/student/rules/grade";

import birthdayRules from "@/components/account/primary/rules/birthday";

import mottoRules from "@/components/account/tutor/rules/motto";
import aboutRules from "@/components/account/tutor/rules/about";
import linkRules from "@/components/account/tutor/rules/link";
import subjectsRules from "@/components/account/tutor/rules/subjects";
import audienceRuels from "@/components/account/tutor/rules/audience";
import languagesRules from "@/components/account/tutor/rules/languages";

import { Grade, Language, Subject } from "@/types";
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
    [index: string]: ValidatableFieldUnion.User;
    firstName = new ValidatableField<string>("", nameRules);
    lastName = new ValidatableField<string>("", nameRules);
    birthday = new ValidatableField<string>("", birthdayRules);
  }

  export class Student implements D.Student {
    [index: string]: ValidatableFieldUnion.Student;
    grade = new ValidatableField<Grade>(1, gradeRules);
  }

  export class Tutor implements D.Tutor {
    [index: string]: ValidatableFieldUnion.Tutor;
    moto = new ValidatableField<string>("", mottoRules);
    about = new ValidatableField<string>("", aboutRules);
    conferenceLink = new ValidatableField<string>("", linkRules);
    subjects = new ValidatableField<Subject[]>([], subjectsRules);
    audience = new ValidatableField<[Grade, Grade]>([1, 12], audienceRuels);
    languages = new ValidatableField<Language[]>([], languagesRules);
  }
}
