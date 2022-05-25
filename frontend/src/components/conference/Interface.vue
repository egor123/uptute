<template>
  <div id="interface">
    <Settings :roomId="roomId" />
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

import {
  ButtonToggleEventPayload,
  IsToggled,
  Streams,
} from "@/interfaces/Conference";
import {
  Vue,
  Component,
  Prop,
  ProvideReactive,
  Watch,
} from "vue-property-decorator";

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
  @ProvideReactive() @Prop(Object) streams!: Streams; // Provide from COnference TODO
  @Prop(String) roomId!: string;

  @ProvideReactive() interfaceInstance: Interface = this;
  @ProvideReactive() isToggled: IsToggled = {
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
  };
  @ProvideReactive() margin: number = 6;

  mounted(): void {
    this.$on("buttonToggle", this.onButtonToggle);

    const self = this;
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
    const self = this;

    switch (name) {
      case "screenShare":
        toggleScreenShare();
        break;
      default:
        toggle({ side, name });
        break;
    }

    function toggleScreenShare(): void {
      const isToggled: boolean = self.isToggled.bottom.screenShare;

      if (!isToggled) self.$emit("shareScreen");
      else {
        const track: MediaStreamTrack = self.streams.local.getVideoTracks()[0];
        if (track.onended == null) return;
        track.stop();
        track.onended(new Event("ended"));
      }
    }
    function toggle({ side, name }: ButtonToggleEventPayload): void {
      self.isToggled[side][name] = !self.isToggled[side][name];
    }
  }
  setShareVal(val: boolean) {
    this.isToggled.bottom.screenShare = val;
  }

  @Watch("isToggled.bottom.end")
  onEndToggle(isToggled: boolean) {
    if (isToggled) this.$emit("endRoom");
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
