import store from "@/store";

import {
  DirTuple,
  DirectionComponentName,
  DirPair,
  DirectionPairs,
  BoolDirPair,
} from "@/components/conference/types";
import { Direction } from "@/types";
import ToggleStore from "@/store/modules/conference/toggleStore";

import { Module, VuexModule, getModule, Action } from "vuex-module-decorators";
import LayoutHandler from "./layoutHandler";

@Module({ dynamic: true, store, name: "conferenceAlternativeInput" })
class ConferenceAlternativeInput extends VuexModule {
  @Action
  public toggleSide(direction: Direction): void {
    const isHorizontal = getIsHorizontal(direction);

    const namePair = getNamePair(isHorizontal, direction);
    const isToggledPair = getIsToggledPair(isHorizontal, namePair);

    const pairs: DirectionPairs = { name: namePair, isToggled: isToggledPair };
    toggle(isHorizontal, getComponent(pairs));
  }
}

export default getModule(ConferenceAlternativeInput);

const getIsHorizontal = (direction: Direction): boolean =>
  direction === "right" || direction === "left";

const getNamePair = (isHoriz: boolean, direction: Direction): DirPair => {
  const tuple: DirTuple = isHoriz ? ["settings", "chat"] : ["bottom", "top"];

  if (direction === "down" || direction === "left") tuple.reverse();

  return { from: tuple[0], towards: tuple[1] };
};
const getIsToggledPair = (isHoriz: boolean, namePair: DirPair): BoolDirPair => {
  const source = isHoriz ? ToggleStore.isToggled.top : LayoutHandler.isBarOpen;

  return { from: source[namePair.from], towards: source[namePair.towards] };
};

const getComponent = (pairs: DirectionPairs): DirectionComponentName =>
  pairs.isToggled.from
    ? pairs.name.from
    : !pairs.isToggled.towards
    ? pairs.name.towards
    : "";

const toggle = (isHorizontal: boolean, name: DirectionComponentName): void => {
  if (name == "") return;
  isHorizontal
    ? ToggleStore.toggle({ side: "top", name })
    : LayoutHandler.toggleBarState({ isTop: name === "top" });
};
