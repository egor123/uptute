<template>
  <div id="interface">
    <Settings :isToggled="isToggled.top.settings" :roomId="roomId" />
    <div id="centerCol">
      <TopBar
        @toggleSettings="isToggled.top.settings = !isToggled.top.settings"
        @toggleChat="isToggled.top.chat = !isToggled.top.chat"
        :isToggled="isToggled.top"
      />
      <Videos :streams="streams" />
      <BottomBar
        :isToggled="isToggled.bottom"
        @toggleMicOff="isToggled.bottom.micOff = !isToggled.bottom.micOff"
        @toggleCamOff="isToggled.bottom.camOff = !isToggled.bottom.camOff"
        @toggleEnd="isToggled.bottom.end = !isToggled.bottom.end"
        @toggleScreenShare="
          isToggled.bottom.screenShare = !isToggled.bottom.screenShare
        "
        @toggleWhiteboard="
          isToggled.bottom.whiteboard = !isToggled.bottom.whiteboard
        "
      />
    </div>
    <Chat :isToggled="isToggled.top.chat" />
  </div>
</template>

<script>
import Settings from "@/components/conference/bars/top/settings/Sidepanel.vue";

import TopBar from "@/components/conference/bars/top/Bar.vue";
import Videos from "@/components/conference/video/Videos.vue";
import BottomBar from "@/components/conference/bars/bottom/Bar.vue";

import Chat from "@/components/conference/bars/top/chat/Sidepanel.vue";

export default {
  data() {
    return {
      isToggled: {
        top: {
          settings: true,
          chat: true,
        },
        bottom: {
          micOff: false,
          camOff: false,
          end: false,
          screenShare: false,
          whiteboard: false,
        },
      },
    };
  },
  props: {
    streams: Object,
    roomId: String,
  },
  components: {
    Settings,

    TopBar,
    Videos,
    BottomBar,

    Chat,
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      closePanels();
    }, 1000);

    function closePanels() {
      const keys = Object.keys(self.isToggled.top);
      keys.forEach((key) => (self.isToggled.top[key] = false));
    }
  },
  watch: {
    "isToggled.bottom.end"(v) {
      if (v) this.$emit("endRoom");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";
#interface {
  @include flexbox(row);
  background: var(--v-background-base);
  #centerCol {
    @include flexbox(column);
    height: 100vh;
    flex: 1;
  }
}
</style>
