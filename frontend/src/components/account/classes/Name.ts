import { NameConstructorPayload } from "../types";

export class Name {
  errMsg: string = "";
  isFirstName: boolean = false;

  constructor({ isFirstName }: NameConstructorPayload) {
    this.isFirstName = isFirstName;
  }
}
