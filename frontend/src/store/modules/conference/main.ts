import store from "@/store";
import { config, constraints } from "@/constants/peer-connection.js";
import { vm } from "@/main";
import router from "@/router";
import { firestore } from "@/firebase.js";

import Caller from "@/store/modules/conference/caller";
import Callee from "@/store/modules/conference/callee";
import {
  Streams,
  DocRef,
  CollectionRef,
  QuerySnapshot,
  DocChange,
  Room,
} from "@/interfaces/Conference";
import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from "vuex-module-decorators";
import { mdiConsoleNetworkOutline } from "@mdi/js";
import Vuetify from "vuetify/lib";

interface InitParams {
  isCaller: boolean;
  id?: string;
}
interface AddUserTrackMutation {
  source: MediaStream;
  isVideo: boolean;
  isLocal: boolean;
}
interface PeerConnectionEventPayload {
  // TODO temporary => delete
  name: string;
  log: {
    pre: string;
    name: string;
  };
}

@Module({ name: "conferenceMain", namespaced: true, dynamic: true, store })
class ConferenceMain extends VuexModule {
  [index: string]: any;

  streams: Streams = {
    local: new MediaStream(),
    remote: new MediaStream(),
  };
  peerConnection: RTCPeerConnection = new RTCPeerConnection(config);
  candidateCollections: { caller?: CollectionRef; callee?: CollectionRef } = {
    caller: undefined,
    callee: undefined,
  };
  room: Room = {
    ref: undefined,
    data: undefined,
  };

  @Action
  async init(initParams: InitParams) {
    await new Promise((r) => setTimeout(r, 0)); // TODO delete ! ! !

    await setLocalTracks(this);

    enterRoom(initParams);

    async function setLocalTracks(instance: ConferenceMain) {
      const source = await navigator.mediaDevices.getUserMedia(constraints);

      instance.addUserTrack({ source, isVideo: true, isLocal: true });
      instance.addUserTrack({ source, isVideo: false, isLocal: true });

      return;
    }
    function enterRoom({ isCaller, id }: InitParams) {
      isCaller ? Caller.createRoom() : Callee.joinRoom(id!);
    }
  }
  @Mutation
  addUserTrack({ source, isVideo, isLocal }: AddUserTrackMutation) {
    console.log({ source, isVideo, isLocal });
    const side: string = isLocal ? "local" : "remote";
    const track: MediaStreamTrack = isVideo
      ? source.getVideoTracks()[0]
      : source.getAudioTracks()[0];
    this.streams[side].addTrack(track);

    console.log(`Got a ${side} track:`, track);
  }
  @Action
  setUpPeerConnection() {
    registerPeerConnectionListeners(this.peerConnection!); // TODO temporary => delete
    onClose(this.peerConnection!, this.closeRoom);
    connectLocalTracks(this.streams, this.peerConnection!);

    function registerPeerConnectionListeners(pc: RTCPeerConnection) {
      // TODO temporary => delete
      addListener({
        name: "icegatheringstatechange",
        log: {
          pre: "ICE gathering state changed",
          name: "iceGatheringState",
        },
      });
      addListener({
        name: "connectionstatechange",
        log: {
          pre: "Connection state change",
          name: "connectionState",
        },
      });
      addListener({
        name: "signalingstatechange",
        log: {
          pre: "Signaling state change",
          name: "signalingState",
        },
      });
      addListener({
        name: "iceconnectionstatechange",
        log: {
          pre: "ICE connection state change",
          name: "iceConnectionState",
        },
      });

      function addListener({ name, log }: PeerConnectionEventPayload) {
        pc.addEventListener(name, () =>
          console.log(`${log.pre}: ${pc[log.name]}`)
        );
      }
    }
    function onClose(pc: RTCPeerConnection, closeRoom: Function) {
      pc.oniceconnectionstatechange = () =>
        pc.iceConnectionState == "disconnected" ? closeRoom() : null;
    }
    function connectLocalTracks(streams: Streams, pc: RTCPeerConnection) {
      const stream: MediaStream = streams.local;
      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];
      pc.addTrack(videoTrack, stream);
      pc.addTrack(audioTrack, stream);
    }
  }
  @Mutation
  closeRoom() {
    this.peerConnection = new RTCPeerConnection();
    console.log("IN CLOSE ROOM");
    vm.$vuetify.theme.dark = false;
    router.push({ path: "/" });
  }
  @Mutation
  collectICECandidates({ isCaller }: { isCaller: boolean }) {
    const path = isCaller ? "caller" : "callee";

    const collectionRef: CollectionRef = getCollectionRef(this.room.ref!);
    this.candidateCollections[path] = collectionRef;
    this.peerConnection!.addEventListener("icecandidate", pushToStore);

    function getCollectionRef(roomRef: DocRef): CollectionRef {
      const name: string = isCaller ? "callerCandidates" : "calleeCandidates";
      return firestore.collection(roomRef, name);
    }
    function pushToStore(e: RTCPeerConnectionIceEvent) {
      if (!e.candidate) return console.log("Got final candidate!");

      console.log("Got candidate: ", e.candidate);
      const candidateJSON: RTCIceCandidateInit = e.candidate.toJSON();
      firestore.addDoc(collectionRef, candidateJSON);
    }
  }
  @Action
  listenForNewTracks() {
    const instance = this;
    this.peerConnection!.addEventListener("track", pullTracks);

    function pullTracks(e: RTCTrackEvent): void {
      const source = e.streams[0];
      instance.addUserTrack({ source, isVideo: true, isLocal: false });
      instance.addUserTrack({ source, isVideo: false, isLocal: false });
    }
  }
  @Mutation
  listenForRemoteICECandidates({ isCaller }: { isCaller: boolean }) {
    const path = isCaller ? "callee" : "caller";

    this.candidateCollections[path] = getCollectionRef(this.room.ref!);
    addListener(this.candidateCollections[path]!, this.peerConnection!);

    function getCollectionRef(roomRef: DocRef): CollectionRef {
      const name: string = isCaller ? "calleeCandidates" : "callerCandidates";
      return firestore.collection(roomRef, name);
    }
    function addListener(
      collection: CollectionRef,
      pc: RTCPeerConnection
    ): void {
      firestore.onSnapshot(collection, pullCandidates);

      function pullCandidates(snapshot: QuerySnapshot): void {
        snapshot.docChanges().forEach(tryPullCandidate);

        async function tryPullCandidate(change: DocChange): Promise<void> {
          if (change.type != "added") return;
          const data = change.doc.data();
          console.log("Got new remote ICE candidate: ", data);
          const candidate = new RTCIceCandidate(data);
          await pc.addIceCandidate(candidate);
        }
      }
    }
  }

  @Mutation
  toggleCam(isOn: boolean) {
    this.streams.local.getVideoTracks()[0].enabled = isOn;
  }
  @Mutation
  toggleMic(isOn: boolean) {
    this.streams.local.getAudioTracks()[0].enabled = isOn;
  }
  @Action
  replaceTrack(data: { isVideo: boolean; newTrack: MediaStreamTrack }): void {
    const self = this;
    const type = data.isVideo ? "video" : "audio";
    updatePeerConnection(this.peerConnection);
    updateLocalStream(this.streams.local);

    async function updatePeerConnection(peerConnection: RTCPeerConnection) {
      const videoSender: RTCRtpSender = getVideoSender();
      await videoSender.replaceTrack(data.newTrack);
      console.log(`Replaced a peer connection track:`, data.newTrack);

      function getVideoSender(): RTCRtpSender {
        const senders: RTCRtpSender[] = peerConnection.getSenders();
        return senders.find((sender) => sender.track!.kind == type)!;
      }
    }
    function updateLocalStream(stream: MediaStream) {
      self.removeUserTrack({ isVideo: data.isVideo, isLocal: true });
      stream.addTrack(data.newTrack);
    }
  }
  @Mutation
  removeUserTrack(data: { isVideo: boolean; isLocal: boolean }) {
    const side: string = data.isLocal ? "local" : "remote";
    const stream: MediaStream = this.streams[side];
    const curTrack = data.isVideo
      ? stream.getVideoTracks()[0]
      : stream.getAudioTracks()[0];
    console.log(`Removed a ${side} track:`, curTrack);
    stream.removeTrack(curTrack);
  }
  @Action
  endRoom() {
    this.peerConnection.close();
    this.closeRoom();
  }
}

export default getModule(ConferenceMain);
