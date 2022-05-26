import store from "@/store";
import { db, firestore } from "@/firebase.js";

import Main from "@/store/modules/conference/main";
import Chat from "@/store/modules/conference/chat";
import { DocData, DocRef, DocSnapshot, Room } from "@/interfaces/Conference";
import { Module, VuexModule, Action, getModule } from "vuex-module-decorators";

@Module({ name: "conferenceCallee", namespaced: true, dynamic: true, store })
class ConferenceCallee extends VuexModule {
  @Action
  async joinRoom(roomId: string) {
    Main.room.ref = await getRoomRef(roomId);
    Main.room.data = await listenForRoomData(Main.room.ref);

    if (!Main.room.data) return;

    Main.setUpPeerConnection();
    onChatDataChannel();

    Main.collectICECandidates({ isCaller: false });

    Main.listenForNewTracks();

    await setRemoteDescription();

    await createSDPAnswer();

    Main.listenForRemoteICECandidates({ isCaller: false });

    async function getRoomRef(roomId: string): Promise<DocRef> {
      return await firestore.doc(db, "rooms", roomId);
    }
    async function listenForRoomData(roomRef: DocRef): Promise<DocData> {
      firestore.onSnapshot(roomRef, pullData);
      return await getRoomData();

      function pullData(doc: DocSnapshot) {
        Main.room.data = doc.data();
        console.log("Current room info: ", Main.room.data);
      }
      async function getRoomData(): Promise<DocData> {
        return await firestore.getDoc(roomRef).then((doc) => doc.data()!);
      }
    }
    function onChatDataChannel(): void {
      Main.peerConnection!.ondatachannel = (e) =>
        Chat.pullDataChannel(e.channel);
    }
    async function setRemoteDescription(): Promise<void> {
      const offer = Main.room.data!.offer;
      console.log("Got offer:", offer);
      const description = new RTCSessionDescription(offer);
      return await Main.peerConnection!.setRemoteDescription(description);
    }
    async function createSDPAnswer(): Promise<void> {
      const answer = await createAnswer();
      await setLocalDescription(answer);
      await updateStore(answer);
      return;

      async function createAnswer(): Promise<RTCSessionDescriptionInit> {
        const answer: RTCSessionDescriptionInit =
          await Main.peerConnection!.createAnswer().then((answer) =>
            JSON.parse(JSON.stringify(answer))
          );
        console.log("Created answer:", answer);
        return answer;
      }
      async function setLocalDescription(answer: RTCSessionDescriptionInit) {
        return await Main.peerConnection!.setLocalDescription(answer);
      }
      async function updateStore(answer: RTCSessionDescriptionInit) {
        return await firestore.updateDoc(Main.room.ref!, { answer });
      }
    }
  }
}

export default getModule(ConferenceCallee);
