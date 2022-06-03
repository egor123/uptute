import {
  IsBarOpen,
  SetBarEl,
  SetBarState,
} from "@/components/conference/types";
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

  topBarEl: Element | null = null;
  bottomBarEl: Element | null = null;

  centerColumnPos: -1 | 0 | 1 = 0;
  isBarOpen: IsBarOpen = { top: false, bottom: false };

  @Action
  async toggle({ isLeft }: { isLeft: boolean }) {
    this.closeOppositePanel({ isLeft });

    await new Promise((r) => setTimeout(() => r(""), 0));

    const sum: number | void = await this.getSumWidth();

    if (!sum) return;

    if (sum > window.innerWidth) {
      if (isLeft) this.setCenterColumnPos(1);
      else this.setCenterColumnPos(-1);
    } else this.setCenterColumnPos(0);

    // await new Promise((r) => setTimeout(() => r(""), 0));

    // dispatchEvent(new Event("resize"));
  }
  @Action
  closeOppositePanel({ isLeft }: { isLeft: boolean }) {
    isLeft
      ? ToggleStore.setToggle({ side: "top", name: "chat", val: false })
      : ToggleStore.setToggle({ side: "top", name: "settings", val: false });
  }
  @Action
  async getSumWidth(): Promise<number | void> {
    if (!this.LeftPanelEl || !this.CenterBarEl || !this.RightPanelEl)
      return console.error("One of three elements is not defined");

    let sum: number = this.CenterBarEl.getBoundingClientRect().width;
    if (ToggleStore.isToggled.top.settings)
      sum += this.LeftPanelEl.getBoundingClientRect().width;
    if (ToggleStore.isToggled.top.chat)
      sum += this.RightPanelEl.getBoundingClientRect().width;

    return sum;
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

  @Mutation
  setBarState({ isTop, val }: SetBarState) {
    const name: string = isTop ? "top" : "bottom";
    this.isBarOpen[name] = val;
  }
  @Mutation
  setbarEl({ isTop, el }: SetBarEl) {
    isTop ? (this.topBarEl = el) : (this.bottomBarEl = el);
  }
}

export default getModule(ConferenceLayoutHandler);
