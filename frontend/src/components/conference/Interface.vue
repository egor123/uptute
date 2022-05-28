<template>
  <div id="interface">
    <Settings />
    <div id="centerCol" ref="centerCol">
      <TopBar />
      <Videos />
      <BottomBar />
    </div>
    <Chat />
  </div>
</template>

<script lang="ts">
import Settings from "@/components/conference/bars/top/settings/Sidepanel.vue";

import TopBar from "@/components/conference/bars/top/Bar.vue";
import Videos from "@/components/conference/video/Videos.vue";
import BottomBar from "@/components/conference/bars/bottom/Bar.vue";

import Chat from "@/components/conference/bars/top/chat/Sidepanel.vue";

import { Vue, Component, ProvideReactive, Ref } from "vue-property-decorator";

@Component({ components: { Settings, TopBar, Videos, BottomBar, Chat } })
export default class Interface extends Vue {
  @Ref("centerCol") centerColRef!: HTMLDivElement;

  @ProvideReactive() margin: number = 6;
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#interface {
  height: 100vh;
  width: 100vw;
  @include flexbox(row);
  background: var(--v-background-base);
  overflow: hidden;
  #centerCol {
    @include flexbox(column);
    height: 100vh;
    flex: 1;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: #ffffff00;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--v-light-darken3);
    border-radius: 15px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--v-light-darken4);
  }
}
</style>
