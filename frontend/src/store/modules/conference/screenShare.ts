import store from "@/store";
import { constraints } from "@/constants/peer-connection.js";

import Main from "@/store/modules/conference/main";
import ToggleStore from "@/store/modules/conference/toggleStore";
import { Module, VuexModule, Action, getModule } from "vuex-module-decorators";

@Module({ name: "screenShare", namespaced: true, dynamic: true, store })
class ScreenShare extends VuexModule {
  @Action
  toggle(isToggled: boolean): void {
    const self = this;

    if (!isToggled) share();
    else {
      const track: MediaStreamTrack = Main.streams.local.getVideoTracks()[0];
      if (track.onended == null) return;
      track.stop();
      track.onended(new Event("ended"));
    }
    async function share(): Promise<void> {
      const screenVideoTrack: MediaStreamTrack | undefined =
        await getScreenVideoTrack();
      if (screenVideoTrack == undefined) return;
      screenVideoTrack.onended = self.stopScreenSharing;
      Main.replaceLocalTrack({ isVideo: true, newTrack: screenVideoTrack });
      ToggleStore.setToggle({ side: "bottom", name: "screenShare", val: true });

      async function getScreenVideoTrack(): Promise<
        MediaStreamTrack | undefined
      > {
        const displayStream: MediaStream | undefined =
          await navigator.mediaDevices.getDisplayMedia().catch((err) => {
            console.log(err);
            return undefined;
          });

        if (displayStream == undefined) return undefined;

        return displayStream.getVideoTracks()[0];
      }
    }
  }
  @Action
  async stopScreenSharing(): Promise<void> {
    const media = await navigator.mediaDevices.getUserMedia(constraints);
    const newTrack: MediaStreamTrack = media.getVideoTracks()[0];
    Main.replaceLocalTrack({ isVideo: true, newTrack });
    ToggleStore.setToggle({ side: "bottom", name: "screenShare", val: false });
    console.log("Stoped sharing the screen");
  }
}

export default getModule(ScreenShare);
