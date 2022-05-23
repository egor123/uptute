<template>
  <SidepanelBase :isToggled="isToggled" :isLeft="false">
    <div id="chat" ref="chat">
      <div id="messages"></div>
      <div id="bar">
        <textarea
          id="inputLine"
          type="text"
          ref="textarea"
          rows="1"
          v-model="input"
        />
        <button @click="sendMessage(input)" id="send">
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
    };
  },
  components: {
    SidepanelBase,
  },
  props: {
    isToggled: Boolean,
  },
  methods: {
    sendMessage(input) {
      this.$store.dispatch("conferenceChat/sendMessage", { msg: input });
      this.input = "";
    },
  },
  watch: {
    input() {
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
    background: green;
    flex: 1;
    width: 100%;
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
      outline: 1px var(--v-card-darken1) solid;
    }
    #send {
      @include box-size(36px);
      margin-left: 12px;
      .icon {
        color: var(--v-accent-base);
      }
    }
  }
}
</style>
