import { Details as D } from "../types";

export module Details {
  export class All implements D.All {
    userDetails = new User();
    studentDetails = new Student();
    tutorDetails = new Tutor();

    update(newDetails: this) {
      for (const key in this)
        if (newDetails[key]) this[key] = { ...this[key], ...newDetails[key] };
    }
  }

  export class User implements D.User {
    birthday = "";
    firstName = "";
    lastName = "";
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
