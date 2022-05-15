<template>
  <div id="interface">
    <!-- <div id="conferenceId">
      Conference ID: {{ room.ref ? room.ref.id : "" }}
    </div> -->
    <Settings :isOpen="isOpen.settings" />
    <div id="centerCol">
      <TopBar
        :room="room"
        @toggleSettings="isOpen.settings = !isOpen.settings"
        @toggleChat="isOpen.chat = !isOpen.chat"
      />
      <Videos :streams="streams" />
      <BottomBar />
    </div>
    <Chat :isOpen="isOpen.chat" />
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
      isOpen: {
        settings: true,
        chat: true,
      },
    };
  },
  props: {
    streams: Object,
    room: Object,
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
      Object.keys(self.isOpen).forEach((key) => (self.isOpen[key] = false));
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";
#interface {
  @include flexbox(row);
  background: var(--v-background-base);
  // #conferenceId {
  //   position: fixed;
  //   bottom: 16px;
  //   left: 50%;
  //   transform: translate(-50%);
  // }
  #centerCol {
    @include flexbox(column);
    height: 100vh;
    flex: 1;
  }
}
</style>
