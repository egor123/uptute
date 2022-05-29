<template>
  <div id="centerColumn">
    <TopBar />
    <Videos />
    <BottomBar />
  </div>
</template>

<script lang="ts">
import TopBar from "@/components/conference/centerColumn/bars/top/Bar.vue";
import Videos from "@/components/conference/centerColumn/video/Videos.vue";
import BottomBar from "@/components/conference/centerColumn/bars/bottom/Bar.vue";

import { Vue, Component } from "vue-property-decorator";
@Component({ components: { TopBar, Videos, BottomBar } })
export default class ConferenceCenterColumn extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#centerColumn {
  @include flexbox(column);
  height: 100vh;
  flex: 1;
  transition: margin 300ms;
  //   margin-right: -200%;
}
</style>
