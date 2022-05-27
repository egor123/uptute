import store from "@/store";
import { dataChannelOptions as options } from "@/constants/peer-connection";

import Main from "@/store/modules/conference/main";
import {
  Message,
  SaveMessage,
  SetDataChannelListeners,
} from "@/components/conference/types";
import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from "vuex-module-decorators";

@Module({ name: "conferenceChat", namespaced: true, dynamic: true, store })
class ConferenceChat extends VuexModule {
  dc: RTCDataChannel = new RTCPeerConnection().createDataChannel("");
  messages: Message[] = [];

  @Action
  createDataChannel(): void {
    const params: [string, typeof options] = ["chat", options];
    const dc: RTCDataChannel = Main.peerConnection.createDataChannel(...params);

    this.setDataChannel(dc);
    this.setListeners({ onMessage: this.onMessage });

    console.log("Created a data channel:", dc);
  }
  @Action
  pullDataChannel(e: RTCDataChannelEvent): void {
    const dc = e.channel;
    this.setDataChannel(dc);
    this.setListeners({ onMessage: this.onMessage });

    console.log("Pulled a data channel:", dc);
  }

  // ! -----------------------------------------------------------------------------------

  // ! --- utility Actions ---------------------------------------------------------------

  // ! -----------------------------------------------------------------------------------

  @Action
  sendMessage(text: string) {
    this.sendToDataChannel(text);
    this.saveMessage({ text, isSelf: true });

    console.log("Sent a Message: ", text);
  }
  @Action
  onMessage(e: MessageEvent) {
    this.saveMessage({ text: e.data, isSelf: false });

    console.log("Got Data Channel Message: ", e.data);
  }

  // ! -----------------------------------------------------------------------------------

  // ! --- Mutations ---------------------------------------------------------------------

  // ! -----------------------------------------------------------------------------------

  @Mutation
  setDataChannel(dc: RTCDataChannel) {
    this.dc = dc;
  }
  @Mutation
  setListeners(payload: SetDataChannelListeners) {
    const dc = this.dc;
    dc.onmessage = (e: MessageEvent) => payload.onMessage(e);
    dc.onerror = (err: Event) => console.error("Data Channel Error:", err);
    dc.onopen = (e: Event) => console.log("Data channel opened", e);
    dc.onclose = () => console.log("The Data Channel is Closed");
  }
  @Mutation
  saveMessage({ text, isSelf }: SaveMessage) {
    const time: number = new Date().valueOf();
    this.messages.push({ text, time, isSelf });
  }
  @Mutation
  sendToDataChannel(text: string) {
    this.dc.send(text);
  }
}

export default getModule(ConferenceChat);
