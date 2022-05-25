import store from "@/store";
import { dataChannelOptions as options } from "@/constants/peer-connection";

import { Message } from "@/interfaces/Conference";
import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule,
} from "vuex-module-decorators";

interface SaveMessageActionPayload {
  text: string;
  isSelf: boolean;
}
interface MutateMutationPayload {
  [index: string]: any;
  name: string;
  val: any;
}

@Module({
  store,
  dynamic: true,
  // namespaced: true,
  name: "conferenceChat",
})
class ConferenceChat extends VuexModule {
  [index: string]: any;
  dc: RTCDataChannel = new RTCPeerConnection().createDataChannel("");
  messages: Message[] = [];

  @Action
  createDataChannel(peerConnection: RTCPeerConnection) {
    const dc: RTCDataChannel = peerConnection.createDataChannel(
      "chat",
      options
    );
    this.context.commit("mutate", { name: "dc", val: dc });
    this.context.dispatch("setListeners");
    console.log("Created a data channel:", dc);
  }
  @Action
  pullDataChannel(dc: RTCDataChannel) {
    this.context.commit("mutate", { name: "dc", val: dc });
    this.context.dispatch("setListeners");
    console.log("Pulled a data channel:", dc);
  }
  @Action
  setListeners() {
    const dc = this.dc;
    dc.onmessage = (e: MessageEvent) => this.context.dispatch("onMessage", e);
    dc.onerror = (error: Event) => console.error("Data Channel Error:", error);
    dc.onopen = (e: Event) => console.log("Data channel opened", e);
    dc.onclose = () => console.log("The Data Channel is Closed");
  }
  @Action
  onMessage(e: MessageEvent) {
    console.log("Got Data Channel Message:", e.data);
    this.context.dispatch("saveMessage", { text: e.data, isSelf: false });
  }
  @Action
  sendMessage(text: string) {
    console.log("Sending:", text);
    this.dc.send(text);
    this.context.dispatch("saveMessage", { text, isSelf: true });
  }
  @Action
  saveMessage({ text, isSelf }: SaveMessageActionPayload) {
    const msg = {
      text,
      time: new Date().valueOf(),
      isSelf,
    };
    this.context.commit("addMessage", msg);
  }

  @Mutation
  mutate({ name, val }: MutateMutationPayload) {
    this[name] = val;
  }
  @Mutation
  addMessage(msg: Message) {
    this.messages.push(msg);
  }
}

export default getModule(ConferenceChat);
