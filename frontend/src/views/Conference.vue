<template>
  <div>
    <div id="buttons">
      <button @click="createRoom()">Create</button>

      <Dialog>
        <template v-slot:object>
          <button>Join</button>
        </template>

        <template v-slot:title id="title"> Room id </template>

        <template v-slot:text>
          <TextField
            v-model="roomId"
            label="Room id"
            :rules="(v) => true"
            :borderRadius="'15px 15px 15px 15px'"
            :flat="false"
            :errMsg="join.errMsg"
            required
          />
          <button @click="joinRoom()">Enter</button>
        </template>
      </Dialog>
    </div>
    <video
      :srcObject.prop="localStream"
      ref="localVideo"
      class="localVideo"
      muted
      playsinline
      autoplay
    ></video>
    <!-- UNMUTE -->
    <video
      :srcObject.prop="remoteStream"
      ref="remoteVideo"
      class="remoteVideo"
      playsinline
      autoplay
    ></video>
    <div id="conferenceId">Conference ID: {{ roomId }}</div>
  </div>
</template>

<script>
import { db, firestore } from "@/firebase.js";
import Dialog from "@/components/global/Dialog.vue";
import TextField from "@/components/filterPanel/TextField.vue";

export default {
  data() {
    return {
      peerConnection: null,
      candidatesCollections: {
        caller: null,
        callee: null,
      },
      localStream: null,
      remoteStream: null,
      roomId: null,
      roomRef: null,
      join: {
        errMsg: "",
      },
      roomSnapshotData: null,
      configuration: {
        iceServers: [
          {
            urls: [
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
            ],
          },
        ],
        iceCandidatePoolSize: 10,
      },
    };
  },
  components: {
    Dialog,
    TextField,
  },
  async mounted() {
    await this.setLocalStream();
    this.remoteStream = new MediaStream();
  },
  methods: {
    async setLocalStream() {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return;
    },
    async createRoom() {
      const self = this;

      this.setUpPeerConnection();

      await sendOffer();

      this.collectICECandidates({ isCaller: true });

      this.listenForNewTracks();

      await listenForRemoteSessionDescription();

      this.listenForRemoteICECandidates({ isCaller: true });

      async function sendOffer() {
        const offer = await self.peerConnection.createOffer();
        await self.peerConnection.setLocalDescription(offer);
        console.log("Created offer:", offer);

        const roomWithOffer = {
          offer: {
            type: offer.type,
            sdp: offer.sdp,
          },
        };

        const res = await firestore.addDoc(
          firestore.collection(db, "rooms"),
          roomWithOffer
        );
        self.roomId = res.id;
        await self.getRoomRef();
        console.log(`New room created with SDP offer. Room ID: ${self.roomId}`);

        return;
      }
      async function listenForRemoteSessionDescription() {
        firestore.onSnapshot(self.roomRef, async (snapshot) => {
          const data = snapshot.data();
          if (
            !self.peerConnection.currentRemoteDescription &&
            data &&
            data.answer
          ) {
            console.log("Got remote description: ", data.answer);
            const rtcSessionDescription = new RTCSessionDescription(
              data.answer
            );
            await self.peerConnection.setRemoteDescription(
              rtcSessionDescription
            );
          }
        });
      }
    },
    async joinRoom() {
      const self = this;
      // Validate input
      await getRoomSnapshot();

      if (this.roomSnapshotData) {
        this.setUpPeerConnection();
        this.collectICECandidates({ isCaller: false });
        this.listenForNewTracks();
        await createSDPAnswer();
        this.listenForRemoteICECandidates({ isCaller: false });
      }
      async function getRoomSnapshot() {
        await self.getRoomRef();
        firestore.onSnapshot(self.roomRef, (doc) => {
          self.roomSnapshotData = doc.data();
          console.log("Current room info: ", self.roomSnapshotData);
        });
        self.roomSnapshotData = await firestore
          .getDoc(self.roomRef)
          .then((doc) => doc.data());
        return;
      }
      async function createSDPAnswer() {
        const offer = self.roomSnapshotData.offer;
        console.log("Got offer:", offer);
        await self.peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await self.peerConnection.createAnswer();
        console.log("Created answer:", answer);
        await self.peerConnection.setLocalDescription(answer);

        const roomWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        await firestore.updateDoc(self.roomRef, roomWithAnswer);
        return;
      }
    },
    async getRoomRef() {
      this.roomRef = await firestore.doc(db, "rooms", this.roomId);
      return;
    },
    setUpPeerConnection() {
      const self = this;
      console.log(
        "Create PeerConnection with configuration: ",
        this.configuration
      );
      this.peerConnection = new RTCPeerConnection(this.configuration);
      registerPeerConnectionListeners();
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      function registerPeerConnectionListeners() {
        self.peerConnection.addEventListener("icegatheringstatechange", () => {
          console.log(
            `ICE gathering state changed: ${self.peerConnection.iceGatheringState}`
          );
        });

        self.peerConnection.addEventListener("connectionstatechange", () => {
          console.log(
            `Connection state change: ${self.peerConnection.connectionState}`
          );
        });

        self.peerConnection.addEventListener("signalingstatechange", () => {
          console.log(
            `Signaling state change: ${self.peerConnection.signalingState}`
          );
        });

        self.peerConnection.addEventListener(
          "iceconnectionstatechange ",
          () => {
            console.log(
              `ICE connection state change: ${self.peerConnection.iceConnectionState}`
            );
          }
        );
      }
    },
    collectICECandidates({ isCaller }) {
      const collectionName = isCaller ? "callerCandidates" : "calleeCandidates";
      const path = isCaller ? "caller" : "callee";
      this.candidatesCollections[path] = firestore.collection(
        this.roomRef,
        collectionName
      );

      this.peerConnection.addEventListener("icecandidate", (event) => {
        if (!event.candidate) {
          console.log("Got final candidate!");
          return;
        }
        console.log("Got candidate: ", event.candidate);
        firestore.addDoc(
          this.candidatesCollections[path],
          event.candidate.toJSON()
        );
      });
    },
    listenForNewTracks() {
      this.peerConnection.addEventListener("track", (event) => {
        console.log("Got remote track:", event.streams[0]);
        event.streams[0].getTracks().forEach((track) => {
          console.log("Add a track to the remoteStream:", track);
          this.remoteStream.addTrack(track);
        });
      });
    },
    listenForRemoteICECandidates({ isCaller }) {
      const collectionName = isCaller ? "calleeCandidates" : "callerCandidates";
      const path = isCaller ? "callee" : "caller";
      this.candidatesCollections[path] = firestore.collection(
        this.roomRef,
        collectionName
      );
      firestore.onSnapshot(this.candidatesCollections[path], (snapshot) => {
        // console.log("!!!!", snapshot.docChanges());
        snapshot.docChanges().forEach(async (change) => {
          if (change.type == "added") {
            let data = change.doc.data();
            console.log(
              `Got new remote ICE candidate: ${JSON.stringify(data)}`
            );
            await this.peerConnection.addIceCandidate(
              new RTCIceCandidate(data)
            );
          }
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/styles.scss";

video {
  border-radius: 15px;
  &.localVideo {
    position: fixed;
    top: 100px; // CHANGE
    right: 20px; // CHANGE
    width: 160px;
    height: 120px;
  }
}
#buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  button {
    background: var(--v-accent-base);
    padding: 8px 16px;
    margin: 8px;
    border-radius: 15px;
  }
}
.v-dialog {
  button {
    @include box-shadow;
    padding: 8px 16px;
    margin: 8px;
    border-radius: 15px;
  }
}
#conferenceId {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%);
}
</style>
