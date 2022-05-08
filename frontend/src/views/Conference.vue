<template>
  <div>
    <div id="buttons">
      <CreateButton @create="createRoom" />
      <JoinButton @join="joinRoom" />
    </div>
    <LocalVideo :stream="streams.local" />
    <RemoteVideo :stream="streams.remote" />
    <div id="conferenceId">
      Conference ID: {{ room.ref ? room.ref.id : "" }}
    </div>
  </div>
</template>

<script>
import { db, firestore } from "@/firebase.js";
import { config, constraints } from "@/constants/peer-connection.js";

import CreateButton from "@/components/conference/buttons/Create.vue";
import JoinButton from "@/components/conference/buttons/Join.vue";
import LocalVideo from "@/components/conference/videos/Local.vue";
import RemoteVideo from "@/components/conference/videos/Remote.vue";

export default {
  data() {
    return {
      peerConnection: null,
      candidateCollections: {
        caller: null,
        callee: null,
      },
      streams: {
        local: null,
        remote: null,
      },
      room: {
        ref: null,
        data: null,
      },
    };
  },
  components: {
    JoinButton,
    CreateButton,
    LocalVideo,
    RemoteVideo,
  },
  async mounted() {
    const self = this;
    createStreams();
    setLocalTracks();

    function createStreams() {
      self.streams.remote = new MediaStream();
      self.streams.local = new MediaStream();
    }
    async function setLocalTracks() {
      const media = await navigator.mediaDevices.getUserMedia(constraints);
      media.getTracks().forEach((track) => self.streams.local.addTrack(track));
    }
  },
  methods: {
    async createRoom() {
      const self = this;

      this.setUpPeerConnection();

      await sendOffer();

      this.collectICECandidates({ isCaller: true });

      this.listenForNewTracks();

      listenForRemoteDescription();

      this.listenForRemoteICECandidates({ isCaller: true });

      async function sendOffer() {
        const offer = await createSDPOffer();
        await setLocalDescription(offer);
        await createRoom(offer);
        return;

        async function createSDPOffer() {
          return await self.peerConnection
            .createOffer()
            .then((offer) => self.getObjectCopy(offer));
        }
        async function setLocalDescription(offer) {
          await self.peerConnection.setLocalDescription(offer);
          console.log("Created offer:", offer);
          return;
        }
        async function createRoom(offer) {
          const rooms = firestore.collection(db, "rooms");
          self.room.ref = await firestore.addDoc(rooms, { offer });

          console.log("New room created with SDP offer.");
          console.log(`Room ID: ${self.room.ref.id}`);

          return;
        }
      }
      function listenForRemoteDescription() {
        firestore.onSnapshot(self.room.ref, setRemoteDescription);

        async function setRemoteDescription(snapshot) {
          const answer = snapshot.data()?.answer;
          const alreadyExists = !!self.peerConnection.currentRemoteDescription;

          if (alreadyExists || !answer) return;
          console.log("Got remote description: ", answer);
          const description = new RTCSessionDescription(answer);
          await self.peerConnection.setRemoteDescription(description);
        }
      }
    },
    async joinRoom(roomId) {
      const self = this;
      // Validate input

      await getRoomRef();
      listenForRoomData();
      await getRoomData();

      if (!this.room.data) return;
      this.setUpPeerConnection();
      this.collectICECandidates({ isCaller: false });
      this.listenForNewTracks();
      await setRemoteDescription();
      await createSDPAnswer();
      this.listenForRemoteICECandidates({ isCaller: false });

      async function getRoomRef() {
        self.room.ref = await firestore.doc(db, "rooms", roomId);
        return;
      }
      function listenForRoomData() {
        firestore.onSnapshot(self.room.ref, pullData);

        function pullData(doc) {
          self.room.data = doc.data();
          console.log("Current room info: ", self.room.data);
        }
      }
      async function getRoomData() {
        self.room.data = await firestore
          .getDoc(self.room.ref)
          .then((doc) => doc.data());
        return;
      }
      async function setRemoteDescription() {
        const offer = getOffer();
        const description = new RTCSessionDescription(offer);
        return await self.peerConnection.setRemoteDescription(description);

        function getOffer() {
          const offer = self.room.data.offer;
          console.log("Got offer:", offer);
          return offer;
        }
      }
      async function createSDPAnswer() {
        const answer = await createAnswer();
        await setLocalDescription(answer);
        await updateStore(answer);
        return;

        async function createAnswer() {
          const answer = await self.peerConnection
            .createAnswer()
            .then((answer) => self.getObjectCopy(answer));
          console.log("Created answer:", answer);
          return answer;
        }
        async function setLocalDescription(answer) {
          return await self.peerConnection.setLocalDescription(answer);
        }
        async function updateStore(answer) {
          await firestore.updateDoc(self.room.ref, { answer });
        }
      }
    },

    setUpPeerConnection() {
      const self = this;
      console.log("Create PeerConnection with configuration: ", config);

      this.peerConnection = new RTCPeerConnection(config);
      registerPeerConnectionListeners();
      connectLocalTracks();

      function registerPeerConnectionListeners() {
        const pc = self.peerConnection;

        addListener({
          name: "icegatheringstatechange",
          log: `ICE gathering state changed: ${pc.iceGatheringState}`,
        });
        addListener({
          name: "connectionstatechange",
          log: `Connection state change: ${pc.connectionState}`,
        });
        addListener({
          name: "signalingstatechange",
          log: `Signaling state change: ${pc.signalingState}`,
        });
        addListener({
          name: "iceconnectionstatechange",
          log: `ICE connection state change: ${pc.iceConnectionState}`,
        });

        function addListener({ name, log }) {
          pc.addEventListener(name, () => console.log(log));
        }
      }
      function connectLocalTracks() {
        const stream = self.streams.local;
        const tracks = stream.getTracks();
        tracks.forEach((track) => self.peerConnection.addTrack(track, stream));
      }
    },
    collectICECandidates({ isCaller }) {
      const self = this;
      const path = isCaller ? "caller" : "callee";

      getCollectionRef();
      addListener();

      function getCollectionRef() {
        const name = isCaller ? "callerCandidates" : "calleeCandidates";

        const collectionRef = firestore.collection(self.room.ref, name);
        self.candidateCollections[path] = collectionRef;
      }
      function addListener() {
        self.peerConnection.addEventListener("icecandidate", pushToStore);

        function pushToStore(event) {
          if (!event.candidate) return console.log("Got final candidate!");

          console.log("Got candidate: ", event.candidate);
          const collection = self.candidateCollections[path];
          const candidateJSON = event.candidate.toJSON();
          firestore.addDoc(collection, candidateJSON);
        }
      }
    },
    listenForNewTracks() {
      const self = this;
      this.peerConnection.addEventListener("track", pullFromStreams);

      function pullFromStreams(event) {
        console.log("Got remote track:", event.streams);
        event.streams.forEach(pullTracks);

        function pullTracks(stream) {
          stream.getTracks().forEach(pullTrack);

          function pullTrack(track) {
            console.log("Add a track to the remoteStream:", track);
            self.streams.remote.addTrack(track);
          }
        }
      }
    },
    listenForRemoteICECandidates({ isCaller }) {
      const self = this;
      const path = isCaller ? "callee" : "caller";

      getCollectionRef();
      addListener();

      function getCollectionRef() {
        const name = isCaller ? "calleeCandidates" : "callerCandidates";

        const collectionRef = firestore.collection(self.room.ref, name);
        self.candidateCollections[path] = collectionRef;
      }
      function addListener() {
        const remoteCandidates = self.candidateCollections[path];
        firestore.onSnapshot(remoteCandidates, pullCandidates);

        function pullCandidates(snapshot) {
          snapshot.docChanges().forEach(tryPullCandidate);

          async function tryPullCandidate(change) {
            if (change.type != "added") return;
            let data = change.doc.data();
            console.log("Got new remote ICE candidate: ", data);
            const candidate = new RTCIceCandidate(data);
            await self.peerConnection.addIceCandidate(candidate);
          }
        }
      }
    },

    getObjectCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/styles.scss";

#buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

#conferenceId {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%);
}
</style>
