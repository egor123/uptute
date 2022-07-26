import store from "@/store";
import {
  Module,
  VuexModule,
  Mutation,
  getModule,
} from "vuex-module-decorators";

@Module({ dynamic: true, store, name: "register" })
export class Register extends VuexModule {
  private _email: string = "";
  private _password: string = "";

  get email() {
    return this._email;
  }
  set email(email) {
    this._email = email;
  }

  get password() {
    return this._password;
  }
  set password(password) {
    this._password = password;
  }

  @Mutation
  setEmail(email: string) {
    this._email = email;
  }
  @Mutation
  setPassword(password: string) {
    this._password = password;
  }
}

export default getModule(Register);
