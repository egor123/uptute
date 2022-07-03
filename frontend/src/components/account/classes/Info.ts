import { Name } from "./Name";

export module Info {
  export class User {
    firstName = new Name({ isFirstName: true });
    lastName = new Name({ isFirstName: false });
    birthday = new Default();
  }
  export class Tutor {
    moto = new Default();
    about = new Default();
    conferenceLink = new Default();
    subjects = new Default();
    audience = new Default();
    languages = new Default();
  }

  class Default {
    errMsg = "";
  }
}
