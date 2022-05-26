import store from "@/store";
import { db, firestore } from "@/firebase.js";

import Main from "@/store/modules/conference/main";
import Chat from "@/store/modules/conference/chat";
import { Module, VuexModule, Action, getModule } from "vuex-module-decorators";
import { DocSnapshot } from "@/components/conference/types";

@Module({ name: "conferenceCaller", namespaced: true, dynamic: true, store })
class ConferenceCaller extends VuexModule {
  @Action
  async createRoom(): Promise<void> {
    new Promise((r) => setTimeout(r, 0));

    Main.setUpPeerConnection();
    Chat.createDataChannel();

    await sendOffer();

    Main.collectICECandidates({ isCaller: true });

    Main.listenForNewTracks();

    listenForRemoteDescription();

    Main.listenForRemoteICECandidates({ isCaller: true });

    async function sendOffer(): Promise<void> {
      const offer: RTCSessionDescription = await createSDPOffer();
      await Main.peerConnection!.setLocalDescription(offer);
      await createRoom(offer);
      return;

      async function createSDPOffer(): Promise<RTCSessionDescription> {
        return await Main.peerConnection!.createOffer().then((offer) =>
          JSON.parse(JSON.stringify(offer))
        );
      }
      async function createRoom(offer: RTCSessionDescription): Promise<void> {
        const rooms = firestore.collection(db, "rooms");
        Main.room.ref = await firestore.addDoc(rooms, { offer });

        console.log("New room created with SDP offer.");
        console.log(`Room ID: ${Main.room.ref.id}`);

        return;
      }
    }
    function listenForRemoteDescription() {
      firestore.onSnapshot(Main.room.ref!, setRemoteDescription);

      async function setRemoteDescription(
        snapshot: DocSnapshot
      ): Promise<void> {
        const pc: RTCPeerConnection = Main.peerConnection!;
        const answer = snapshot.data()?.answer;
        const ifExists: boolean = !!pc.currentRemoteDescription;

        if (ifExists || !answer) return;
        console.log("Got remote description: ", answer);
        const description = new RTCSessionDescription(answer);
        await pc.setRemoteDescription(description);
      }
    }
  }
}

export default getModule(ConferenceCaller);
