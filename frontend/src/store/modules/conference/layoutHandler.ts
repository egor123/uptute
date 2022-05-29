import store from "@/store";

import ToggleStore from "@/store/modules/conference/toggleStore";
import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from "vuex-module-decorators";

@Module({
  name: "conferenceLayoutHandler",
  namespaced: true,
  dynamic: true,
  store,
})
class ConferenceLayoutHandler extends VuexModule {
  LeftPanelEl: Element | null = null;
  CenterBarEl: Element | null = null;
  RightPanelEl: Element | null = null;

  centerColumnPos: -1 | 0 | 1 = 0;

  @Action
  async toggle({ isLeft }: { isLeft: boolean }) {
    await new Promise((r) => setTimeout(() => r(""), 0));

    if (!this.LeftPanelEl || !this.CenterBarEl || !this.RightPanelEl) return;

    let sum: number = this.CenterBarEl.getBoundingClientRect().width;
    if (ToggleStore.isToggled.top.settings)
      sum += this.LeftPanelEl.getBoundingClientRect().width;
    if (ToggleStore.isToggled.top.chat)
      sum += this.RightPanelEl.getBoundingClientRect().width;

    if (sum > window.innerWidth) {
      if (isLeft) this.setCenterColumnPos(1);
      else this.setCenterColumnPos(-1);
    } else this.setCenterColumnPos(0);
  }

  @Mutation
  setLeftPanelEl(el: Element) {
    this.LeftPanelEl = el;
  }
  @Mutation
  setCenterBarEl(el: Element) {
    this.CenterBarEl = el;
  }
  @Mutation
  setRightPanelEl(el: Element) {
    this.RightPanelEl = el;
  }
  @Mutation
  setCenterColumnPos(val: -1 | 0 | 1) {
    this.centerColumnPos = val;
  }
}

export default getModule(ConferenceLayoutHandler);
