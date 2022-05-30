<template>
  <div
    id="centerColumn"
    :class="{ hideToLeft: pos == -1, hideToRight: pos == 1 }"
  >
    <TopBar />
    <Videos />
    <BottomBar />
  </div>
</template>

<script lang="ts">
import TopBar from "@/components/conference/centerColumn/bars/top/Bar.vue";
import Videos from "@/components/conference/centerColumn/video/Videos.vue";
import BottomBar from "@/components/conference/centerColumn/bars/bottom/Bar.vue";

import LayoutHandler from "@/store/modules/conference/layoutHandler";
import { Vue, Component } from "vue-property-decorator";
@Component({ components: { TopBar, Videos, BottomBar } })
export default class ConferenceCenterColumn extends Vue {
  get pos() {
    return LayoutHandler.centerColumnPos;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#centerColumn {
  @include flexbox(column);
  height: 100vh;
  flex: 1;

  transition: margin 1s;
  &.hideToLeft {
    margin-left: -200%;
  }
  &.hideToRight {
    margin-right: -200%;
  }
}
</style>
