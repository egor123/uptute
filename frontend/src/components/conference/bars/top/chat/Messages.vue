<template>
  <div ref="messages" id="messages">
    <div
      v-for="(msg, id) in Chat.messages"
      :key="id"
      class="msgLine"
      :class="{ isSelf: msg.isSelf, hasSpaceBefore: ifSpaceBefore(id) }"
    >
      <div ref="message" class="msg">{{ msg.text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Chat from "@/store/modules/conference/chat";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Vue, Component, Ref, Watch } from "vue-property-decorator";

@Component
export default class ConferenceChatMessages extends Vue {
  Chat = Chat;

  @Ref("messages") messagesRef!: HTMLDivElement;
  @Ref("message") messageRefs!: HTMLDivElement[];

  maxHeightForAutoscroll: number = 300;

  get isToggled() {
    return ToggleStore.isToggled.top.chat;
  }

  ifSpaceBefore(id: number): boolean {
    if (id <= 0) return false;
    const isLastSelf: boolean = Chat.messages[id].isSelf;
    const isPrevSelf: boolean = Chat.messages[id - 1].isSelf;
    const ifPersonChanged: boolean = isLastSelf != isPrevSelf;
    return ifPersonChanged;
  }

  async tryScrollToLastMessage(isOnOpen?: boolean): Promise<void> {
    const self = this;

    const messages = Chat.messages;
    const messagesExist: boolean = messages.length > 0;
    const isOpen = this.isToggled;
    const isSelf: boolean = messages[messages.length - 1]?.isSelf == true;

    if (messagesExist && isOpen && (isSelf || isCloseToBottom() || isOnOpen))
      this.$nextTick(() => scrollToLastMessage());

    function isCloseToBottom(): boolean {
      const el: HTMLDivElement = self.messagesRef;
      const isClose: boolean =
        el.scrollHeight - el.offsetHeight - el.scrollTop <
        self.maxHeightForAutoscroll;
      return isClose;
    }
    function scrollToLastMessage(): void {
      const lastMessageId: number = self.messageRefs.length - 1;
      const lastMessageEl: HTMLDivElement = self.messageRefs[lastMessageId];

      const lastMessageY: number = lastMessageEl.getBoundingClientRect().y;
      const messagesY: number = self.messagesRef.getBoundingClientRect().y;

      const top: number = lastMessageY - messagesY;

      self.messagesRef.scrollTo({ top, behavior: "smooth" });
    }
  }
  @Watch("Chat.messages")
  onMessagesChange = () => this.tryScrollToLastMessage();
  @Watch("isToggled")
  onToggleChange = () => this.tryScrollToLastMessage(true);
}
</script>

<style lang="scss" scoped>
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
</style>
