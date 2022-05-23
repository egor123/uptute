<template>
  <SidepanelBase :isToggled="isToggled" :isLeft="false">
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

<script>
import SidepanelBase from "@/components/conference/bars/top/SideBase.vue";

export default {
  data() {
    return {
      input: "",
      maxInputHeightPercent: 10,
      maxHeightForAutoscroll: 300,
    };
  },
  components: {
    SidepanelBase,
  },
  computed: {
    messages() {
      return this.$store.state.conferenceChat.messages;
    },
  },
  props: {
    isToggled: Boolean,
  },
  methods: {
    sendMessage() {
      this.$store.dispatch("conferenceChat/sendMessage", { text: this.input });
      this.input = "";
      this.$nextTick(() => this.resizeTextArea());
    },
    onTextareaKey(e) {
      if (e.keyCode == 13) {
        if (e.shiftKey) return;
        e.preventDefault();
        this.sendMessage();
      }
    },
    resizeTextArea() {
      const chatHeight = this.$refs.chat.offsetHeight;
      const maxHeight = (chatHeight * this.maxInputHeightPercent) / 100;

      const inputEl = this.$refs.textarea;
      inputEl.style.height = "auto";
      const scrollH = inputEl.scrollHeight;

      this.$nextTick(() => {
        if (scrollH < maxHeight) inputEl.style.height = scrollH + "px";
        else inputEl.style.height = maxHeight + "px";
      });
    },
    ifSpaceBefore(id) {
      const prevId = id == 0 ? id : id - 1;
      const ifPersonChanged =
        this.messages[id].isSelf != this.messages[prevId].isSelf;
      return ifPersonChanged;
    },
    scrollToLastMessage() {
      console.log("Scroll to last message");
      const messageRefs = this.$refs.message;
      const lasetMessageRef = messageRefs[messageRefs.length - 1];

      lasetMessageRef.scrollIntoView({ behavior: "smooth" });
    },
  },
  watch: {
    input() {
      this.resizeTextArea();
    },
    messages(messages) {
      const self = this;

      if (isSelf() || isCloseToBottom())
        this.$nextTick(() => this.scrollToLastMessage());

      function isSelf() {
        return messages[messages.length - 1].isSelf == true;
      }
      function isCloseToBottom() {
        const el = self.$refs.messages;
        const isClose =
          el.scrollHeight - el.offsetHeight - el.scrollTop <
          self.maxHeightForAutoscroll;

        return isClose;
      }
    },
  },
};
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
