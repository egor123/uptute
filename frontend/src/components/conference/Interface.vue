<template>
  <div id="interface">
    <!-- <div id="conferenceId">
      Conference ID: {{ room.ref ? room.ref.id : "" }}
    </div> -->
    <Settings ref="leftPanel" />
    <div id="centerCol" :style="`--w: ${centerColWidth}px`">
      <TopBar ref="topBar" :room="room" />
      <Videos :streams="streams" :colW="centerColWidth" />
      <BottomBar ref="bottomBar" />
    </div>
    <Chat ref="rightPanel" />
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
  data() {
    return {
      centerColWidth: null,
    };
  },
  components: {
    Settings,

    TopBar,
    Videos,
    BottomBar,

    Chat,
  },
  mounted() {
    addEventListener("resize", this.onResize);
    this.onResize();
  },
  methods: {
    onResize() {
      const self = this;
      self.centerColWidth = getCenterColWidth();

      function getCenterColWidth() {
        const lPanelW = self.$refs.leftPanel?.$el.offsetWidth || 0;
        const rPanelW = self.$refs.rightPanel?.$el.offsetWidth || 0;
        return innerWidth - (lPanelW + rPanelW);
      }
    },
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
    width: var(--w);
    @include flexbox(column);
  }
}
</style>
