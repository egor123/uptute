import store from "@/store";

import {
  Module,
  VuexModule,
  getModule,
  Mutation,
} from "vuex-module-decorators";

import Main from "@/store/modules/conference/main";
import ScreenShare from "@/store/modules/conference/screenShare";
import { ButtonToggleEventPayload, IsToggled } from "@/interfaces/Conference";
@Module({ name: "isToggled", namespaced: true, dynamic: true, store })
class ToggleStore extends VuexModule {
  isToggled: IsToggled = {
    top: {
      settings: true,
      chat: true,
    },
    bottom: {
      micOff: false,
      camOff: false,
      end: false,
      screenShare: false,
      whiteboard: false,
    },
  };

  @Mutation
  toggle({ side, name }: ButtonToggleEventPayload): void {
    const self = this;
    const cur: boolean = this.isToggled[side][name];

    switch (name) {
      case "screenShare":
        ScreenShare.toggle(cur);
        break;
      case "end":
        Main.endRoom();
        break;
      default:
        toggle({ side, name });
        break;
    }
    function toggle({ side, name }: ButtonToggleEventPayload): void {
      self.isToggled[side][name] = !self.isToggled[side][name];
    }
  }
  @Mutation
  setToggle(data: { side: string; name: string; val: boolean }) {
    this.isToggled[data.side][data.name] = data.val;
  }
}

export default getModule(ToggleStore);
