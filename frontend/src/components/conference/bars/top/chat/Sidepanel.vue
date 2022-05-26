<template>
  <SidepanelBase :isToggled="toggleStore.isToggled.top.chat" :isLeft="false">
    <div id="chat" ref="chat">
      <div ref="messages" id="messages">
        <div
          class="msgLine"
          v-for="(msg, id) in messages"
          :key="id"
          :class="{ isSelf: msg.isSelf, hasSpaceBefore: ifSpaceBefore(id) }"
        >
          <div ref="message" class="msg">{{ msg.text }}</div>
        </div>
      </div>

      <div id="bar">
        <textarea
          @keypress="onTextareaKey"
          id="inputLine"
          type="text"
          ref="textarea"
          rows="1"
          v-model="input"
        />
        <button @click="sendMessage()" id="send">
          <v-icon class="icon"> mdi-send </v-icon>
        </button>
      </div>
    </div>
  </SidepanelBase>
</template>

<script lang="ts">
import SidepanelBase from "@/components/conference/bars/top/SideBase.vue";

import Chat from "@/store/modules/conference/chat";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Message } from "@/interfaces/Conference";
import { Vue, Component, Ref, Watch } from "vue-property-decorator";

@Component({ components: { SidepanelBase } })
export default class ChatPanel extends Vue {
  toggleStore = ToggleStore;

  @Ref("chat") chatRef!: HTMLDivElement;
  @Ref("textarea") textareaRef!: HTMLTextAreaElement;
  @Ref("messages") messagesRef!: HTMLDivElement;
  @Ref("message") messageRefs!: HTMLDivElement[];

  input: string = "";
  maxInputHeightPercent: number = 10;
  maxHeightForAutoscroll: number = 300;

  get messages(): Message[] {
    return Chat.messages;
  }

  sendMessage(): void {
    Chat.sendMessage(this.input);
    this.input = "";
    this.$nextTick(() => this.resizeTextArea());
  }
  onTextareaKey(e: KeyboardEvent): void {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }
  resizeTextArea(): void {
    const chatHeight: number = this.chatRef.offsetHeight;
    const maxHeight: number = (chatHeight * this.maxInputHeightPercent) / 100;

    this.textareaRef.style.height = "auto";
    const scrollH: number = this.textareaRef.scrollHeight;

    this.$nextTick(() => {
      const h: number = scrollH < maxHeight ? scrollH : maxHeight;
      this.textareaRef.style.height = h + "px";
    });
  }
  ifSpaceBefore(id: number): boolean {
    const prevId: number = id == 0 ? id : id - 1;
    const ifPersonChanged: boolean =
      this.messages[id].isSelf != this.messages[prevId].isSelf;
    return ifPersonChanged;
  }
  scrollToLastMessage(): void {
    console.log("Scroll to last message");

    const lastMessageId: number = this.messageRefs.length - 1;
    const lasetMessageRef: HTMLDivElement = this.messageRefs[lastMessageId];

    lasetMessageRef.scrollIntoView({ behavior: "smooth" });
  }
  tryScrollToLastMessage(): void {
    if (this.messages.length == 0) return;

    const self = this;

    if (isSelf() || isCloseToBottom())
      this.$nextTick(() => this.scrollToLastMessage());

    function isSelf(): boolean {
      let lastMessageId: number = self.messages.length - 1;
      return self.messages[lastMessageId].isSelf == true;
    }
    function isCloseToBottom(): boolean {
      const el: HTMLDivElement = self.messagesRef;
      const isClose: boolean =
        el.scrollHeight - el.offsetHeight - el.scrollTop <
        self.maxHeightForAutoscroll;
      return isClose;
    }
  }

  @Watch("input")
  onInputChange = (): void => this.resizeTextArea();
  @Watch("messages")
  onMessagesChange = () => this.tryScrollToLastMessage();
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#chat {
  width: 400px;
  @include flexbox(column);
  height: 100%;
  #messages {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    .msgLine {
      margin: 2px 0;
      display: flex;
      &.hasSpaceBefore {
        margin-top: 18px;
      }
      .msg {
        border-radius: 15px;
        padding: 6px 12px;
        width: fit-content;
        text-align: left;
        word-break: break-word;
      }
      &.isSelf {
        justify-content: right;
        .msg {
          border: 1px var(--v-accent-darken2) solid;
          margin-left: 24px;
        }
      }
      &:not(.isSelf) {
        justify-content: left;
        .msg {
          border: 1px var(--v-light-darken4) solid;
          margin-right: 20%;
        }
      }
    }
  }
  #bar {
    @include flexbox(row);
    height: fit-content;
    width: 100%;
    max-height: 80%;
    margin-top: 12px;

    #inputLine {
      resize: none;
      flex: 1;
      border-radius: 15px;
      padding: 6px 12px;
      color: var(--v-light-base);
      border: 1px var(--v-light-darken4) solid;
      outline: none;

      transition: border 300ms;
      &:hover,
      &:focus {
        border: 1px var(--v-accent-darken2) solid;
      }
    }
    #send {
      @include box-size(36px);
      margin-left: 12px;
      .icon {
        transition: color 300ms;
        color: var(--v-accent-base);
      }
      &:hover .icon {
        color: var(--v-accent-darken2);
      }
    }
  }
}
</style>
