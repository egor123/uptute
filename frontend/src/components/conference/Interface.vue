<template>
  <div id="interface">
    <!-- :roomId="roomId" -->
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
import { ButtonToggleEventPayload, IsToggled } from "@/interfaces/Conference";
import { Vue, Component, ProvideReactive } from "vue-property-decorator";
@Component({
  components: {
    Settings,

    TopBar,
    Videos,
    BottomBar,

    Chat,
  },
})
export default class Interface extends Vue {
  @ProvideReactive() interfaceInstance: Interface = this;
  @ProvideReactive() get isToggled(): IsToggled {
    return ToggleStore.isToggled;
  }

  @ProvideReactive() margin: number = 6;

  mounted(): void {
    const self = this;

    this.$on("buttonToggle", this.onButtonToggle);
    this.$nextTick(() => closePanels());

    function closePanels(): void {
      const keys: string[] = Object.keys(self.isToggled.top);
      keys.forEach((key: string) => (self.isToggled.top[key] = false));
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
  @include flexbox(row);
  background: var(--v-background-base);
  #centerCol {
    @include flexbox(column);
    height: 100vh;
    flex: 1;
  }
}
</style>
