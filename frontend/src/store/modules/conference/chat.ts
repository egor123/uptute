import store from "@/store";
import { dataChannelOptions as options } from "@/constants/peer-connection";

import Main from "@/store/modules/conference/main";
import { Message } from "@/interfaces/Conference";
import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from "vuex-module-decorators";

interface SaveMessageActionPayload {
  text: string;
  isSelf: boolean;
}

@Module({ name: "conferenceChat", namespaced: true, dynamic: true, store })
class ConferenceChat extends VuexModule {
  [index: string]: any;

  dc: RTCDataChannel = new RTCPeerConnection().createDataChannel("");
  messages: Message[] = [];

  @Action
  createDataChannel(): void {
    const params: [string, typeof options] = ["chat", options];
    const dc: RTCDataChannel = Main.peerConnection.createDataChannel(...params);

    this.mutate({ name: "dc", val: dc });
    this.setListeners();

    console.log("Created a data channel:", dc);
  }
  @Action
  pullDataChannel(dc: RTCDataChannel) {
    this.mutate({ name: "dc", val: dc });
    this.setListeners();

    console.log("Pulled a data channel:", dc);
  }
  @Action
  setListeners() {
    const dc = this.dc;
    dc.onmessage = (e: MessageEvent) => this.onMessage(e);
    dc.onerror = (er: Event) => console.error("Data Channel Error:", er);
    dc.onopen = (e: Event) => console.log("Data channel opened", e);
    dc.onclose = () => console.log("The Data Channel is Closed");
  }
  @Action
  onMessage(e: MessageEvent) {
    this.saveMessage({ text: e.data, isSelf: false });

    console.log("Got Data Channel Message: ", e.data);
  }
  @Action
  sendMessage(text: string) {
    this.dc.send(text);
    this.saveMessage({ text, isSelf: true });

    console.log("Sent a Message: ", text);
  }
  @Action
  saveMessage({ text, isSelf }: SaveMessageActionPayload) {
    const time: number = new Date().valueOf();
    this.addMessage({ text, time, isSelf });
  }

  @Mutation
  mutate({ name, val }: { name: string; val: any }) {
    this[name] = val;
  }
  @Mutation
  addMessage(msg: Message) {
    this.messages.push(msg);
  }
}

export default getModule(ConferenceChat);
