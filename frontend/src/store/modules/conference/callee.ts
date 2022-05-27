import store from "@/store";
import { db, firestore } from "@/firebase.js";

import Main from "@/store/modules/conference/main";
import Chat from "@/store/modules/conference/chat";
import { DocData, DocSnapshot } from "@/components/conference/types";
import { Module, VuexModule, Action, getModule } from "vuex-module-decorators";

@Module({ name: "conferenceCallee", namespaced: true, dynamic: true, store })
class ConferenceCallee extends VuexModule {
  @Action
  async joinRoom(roomId: string): Promise<boolean> {
    Main.setRoomRef(firestore.doc(db, "rooms", roomId));

    this.listenForRemoteDescription(this.sendSdpAnswer);

    Main.peerConnection!.ondatachannel = Chat.pullDataChannel;

    return true;
  }
  @Action
  listenForRemoteDescription(sendSdpAnswer: Function): void {
    firestore.onSnapshot(Main.roomRef!, (doc: DocSnapshot) => {
      const description: DocData = doc.data()!;
      Main.setRemoteDescriptionToPC(description.offer);
      if (!description.answer) sendSdpAnswer();
    });
  }
  @Action
  async sendSdpAnswer(): Promise<void> {
    const answer = await Main.peerConnection.createAnswer();
    Main.peerConnection!.setLocalDescription(answer);
    firestore.updateDoc(Main.roomRef!, { answer });
  }
}

export default getModule(ConferenceCallee);
