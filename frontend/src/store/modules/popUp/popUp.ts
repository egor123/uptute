import store from "@/store";
import {
  Module,
  VuexModule,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";
import { ButtonsObj, ColorObj, TitleObj, Button } from "./types";

@Module({ dynamic: true, store, name: "popUp" })
class PopUp extends VuexModule {
  private _title: TitleObj = { value: "", default: "" };
  public get title() {
    return this._title.value;
  }

  private _buttons: ButtonsObj = { value: [], default: [] };
  public get buttons() {
    return this._buttons.value;
  }

  private _backgroundColor: ColorObj = {
    value: "",
    default: "var(--v-accent-base)",
  };
  public get backgroundColor() {
    return this._backgroundColor.value;
  }

  private _color: ColorObj = { value: "", default: "#fff" };
  public get color() {
    return this._color.value;
  }

  @Action
  public setDefauls() {
    this.setTitle(this._title.default);
    this.setButtons(this._buttons.default);
    this.setBackgrounColor(this._backgroundColor.default);
    this.setColor(this._color.default);
  }

  @Mutation
  public setTitle(title: string) {
    console.warn("try set title: ", title);
    this._title.value = title;
  }
  @Mutation
  public setButtons(buttons: Button[]) {
    this._buttons.value = buttons;
  }
  @Mutation
  public setBackgrounColor(color: string) {
    this._backgroundColor.value = color;
  }
  @Mutation
  public setColor(color: string) {
    this._color.value = color;
  }
}

export default getModule(PopUp);
