import {
  BarElements,
  ColumnElemnts,
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
  columns: ColumnElemnts = { left: null, center: null, right: null };
  bars: BarElements = { top: null, bottom: null };
  isBarOpen: IsBarOpen = { top: false, bottom: false };

  centerColumnPos: -1 | 0 | 1 = 0;

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
  }
  @Action
  closeOppositePanel({ isLeft }: { isLeft: boolean }) {
    isLeft
      ? ToggleStore.setToggle({ side: "top", name: "chat", val: false })
      : ToggleStore.setToggle({ side: "top", name: "settings", val: false });
  }
  @Action
  async getSumWidth(): Promise<number | void> {
    if (!this.columns.left || !this.columns.center || !this.columns.right)
      throw new Error("One of three elements is not defined");

    let sum: number = this.columns.center.getBoundingClientRect().width;
    if (ToggleStore.isToggled.top.settings)
      sum += this.columns.left.getBoundingClientRect().width;
    if (ToggleStore.isToggled.top.chat)
      sum += this.columns.right.getBoundingClientRect().width;

    return sum;
  }

  @Mutation
  setLeftPanelEl(el: Element) {
    this.columns.left = el;
  }
  @Mutation
  setCenterBarEl(el: Element) {
    this.columns.center = el;
  }
  @Mutation
  setRightPanelEl(el: Element) {
    this.columns.right = el;
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
    const name = isTop ? "top" : "bottom";
    this.bars[name] = el;
  }
}

export default getModule(ConferenceLayoutHandler);
