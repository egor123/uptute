import store from "@/store";
import { Module, VuexModule, getModule } from "vuex-module-decorators";

@Module({ dynamic: true, store, name: "balance" })
export class Balance extends VuexModule {
  private _balance: number = 43.1252451524; // TODO request from server

  public get balance() {
    return Math.floor(this._balance * 100) / 10;
  }
  private set balance(newBalance: number) {
    this._balance = newBalance;
  }
}

export default getModule(Balance);
