import store from "@/store";
import {
  Module,
  VuexModule,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";
import { Props } from "./types";

@Module({ dynamic: true, store, name: "popUp" })
class PopUp extends VuexModule {
  public isVisible = false;
  public get title() {
    return this.props.title;
  }
  public get buttons() {
    return this.props.buttons;
  }
  public get backgroundColor() {
    return this.props.backgroundColor;
  }
  public get color() {
    return this.props.color;
  }

  private props: Props = {
    title: "",
    buttons: [],
    backgroundColor: "",
    color: "",
  };

  private defaults: Props = {
    title: "",
    buttons: [],
    backgroundColor: "var(--v-accent-base)",
    color: "#fff",
  };

  // ! --- Actions -------------------------------------------------------------------------------------

  @Action
  public setProps(props: Partial<PopUp>) {
    this.setVariables({ ...this.defaults, ...props });
  }

  // ! --- Mutatations ---------------------------------------------------------------------------------

  @Mutation
  private setVariables(props: Props) {
    for (const [key, value] of Object.entries(props))
      this.props[key as keyof Props] = value;
  }

  @Mutation
  public setIfVisible(bool: boolean) {
    this.isVisible = bool;
  }
}

export default getModule(PopUp);
