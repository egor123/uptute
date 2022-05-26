<template>
  <div id="interface">
    <Settings />
    <div id="centerCol">
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

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Vue, Component, ProvideReactive } from "vue-property-decorator";

@Component({ components: { Settings, TopBar, Videos, BottomBar, Chat } })
export default class Interface extends Vue {
  @ProvideReactive() margin: number = 6;

  mounted(): void {
    this.$nextTick(() => closeSidePanels());

    function closeSidePanels(): void {
      const keys: string[] = Object.keys(ToggleStore.isToggled.top);
      keys.forEach((key: string) =>
        ToggleStore.toggle({ side: "top", name: key })
      );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#interface {
  height: 100vh;
  width: 100vw;
  @include flexbox(row);
  background: var(--v-background-base);
  #centerCol {
    @include flexbox(column);
    height: 100vh;
    flex: 1;
  }
}
</style>
