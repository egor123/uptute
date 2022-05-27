import store from "@/store";
import { db, firestore } from "@/firebase.js";

import Main from "@/store/modules/conference/main";
import Chat from "@/store/modules/conference/chat";
import { Module, VuexModule, Action, getModule } from "vuex-module-decorators";
import {
  CollectionRef,
  DocRef,
  DocSnapshot,
} from "@/components/conference/types";

@Module({ name: "conferenceCaller", namespaced: true, dynamic: true, store })
class ConferenceCaller extends VuexModule {
  @Action
  async createRoom(): Promise<boolean> {
    Chat.createDataChannel();

    const description = await Main.peerConnection.createOffer();

    Main.setLocalDescriptionToPC(description);

    const isOfferSent = await sendOffer(description);
    if (!isOfferSent) return false;

    listenForRemoteDescription();

    return true;

    async function sendOffer(offer: RTCSessionDescriptionInit) {
      const rooms: CollectionRef = firestore.collection(db, "rooms");
      const roomRef: DocRef = await firestore.addDoc(rooms, { offer });

      if (!roomRef) return Main.failedToJoin({ err: "Room ref undefined" });
      Main.setRoomRef(roomRef);

      console.log("New room created with SDP offer.");
      console.log(`Room ID: ${roomRef.id}`);

      return true;
    }
    function listenForRemoteDescription(): void {
      firestore.onSnapshot(Main.roomRef!, setRemoteDescription);

      async function setRemoteDescription(snapshot: DocSnapshot) {
        const pc: RTCPeerConnection = Main.peerConnection;

        const answer = snapshot.data()?.answer;
        if (!answer) return;

        const ifExists: boolean = !!pc.currentRemoteDescription;
        if (ifExists) return console.log("Remote description already exists");

        console.log("Got remote description: ", answer);
        const description = new RTCSessionDescription(answer);
        Main.setRemoteDescriptionToPC(description);
      }
    }
  }
}

export default getModule(ConferenceCaller);
