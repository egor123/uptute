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
import { ButtonToggleEventPayload } from "@/interfaces/Conference";
import { Vue, Component, ProvideReactive } from "vue-property-decorator";

@Component({
  components: { Settings, TopBar, Videos, BottomBar, Chat },
})
export default class Interface extends Vue {
  @ProvideReactive() margin: number = 6;

  mounted(): void {
    this.$on("buttonToggle", this.onButtonToggle);
    this.$nextTick(() => closePanels());

    function closePanels(): void {
      const keys: string[] = Object.keys(ToggleStore.isToggled.top);
      keys.forEach((key: string) => (ToggleStore.isToggled.top[key] = false));
    }
  }
  beforeDestroy(): void {
    this.$off("buttonToggle", this.onButtonToggle);
  }

  onButtonToggle({ side, name }: ButtonToggleEventPayload): void {
    ToggleStore.toggle({ side, name });
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
