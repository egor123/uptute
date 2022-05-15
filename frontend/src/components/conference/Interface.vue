<template>
  <div id="interface">
    <!-- <div id="conferenceId">
      Conference ID: {{ room.ref ? room.ref.id : "" }}
    </div> -->
    <Settings />
    <div id="centerCol">
      <TopBar :room="room" />
      <Videos :streams="streams" />
      <BottomBar />
    </div>
    <Chat />
  </div>
</template>

<script>
import Settings from "@/components/conference/bars/top/settings/Sidepanel.vue";

import TopBar from "@/components/conference/bars/top/Bar.vue";
import Videos from "@/components/conference/video/Videos.vue";
import BottomBar from "@/components/conference/bars/bottom/Bar.vue";

import Chat from "@/components/conference/bars/top/chat/Sidepanel.vue";

export default {
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
    // transition: all 1000ms;
    height: 100vh;
    flex: 1;
  }
}
</style>
