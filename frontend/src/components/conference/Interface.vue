<template>
  <div id="interface">
    <Settings :isToggled="isToggled.top.settings" :roomId="roomId" />
    <div id="centerCol">
      <TopBar
        @toggleSettings="toggle('top', 'settings')"
        @toggleChat="toggle('top', 'chat')"
        :isToggled="isToggled.top"
      />
      <Videos :streams="streams" :isToggled="isToggled.bottom" />
      <BottomBar
        :isToggled="isToggled.bottom"
        @toggleMicOff="toggle('bottom', 'micOff')"
        @toggleCamOff="toggle('bottom', 'camOff')"
        @toggleEnd="toggle('bottom', 'end')"
        @toggleScreenShare="toggleScreenShare()"
        @toggleWhiteboard="toggle('bottom', 'whiteboard')"
      />
    </div>
    <Chat :isToggled="isToggled.top.chat" />
  </div>
</template>

<script lang="ts">
import Settings from "@/components/conference/bars/top/settings/Sidepanel.vue";

import TopBar from "@/components/conference/bars/top/Bar.vue";
import Videos from "@/components/conference/video/Videos.vue";
import BottomBar from "@/components/conference/bars/bottom/Bar.vue";

import Chat from "@/components/conference/bars/top/chat/Sidepanel.vue";

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

interface IsToggled {
  [index: string]: {
    [index: string]: boolean;
  };
}
interface Streams {
  local: MediaStream;
  remote: MediaStream;
}

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
  isToggled: IsToggled = {
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

  @Prop(Object) streams!: Streams;
  @Prop(String) roomId!: string;

  mounted(): void {
    const self = this;
    this.$nextTick(() => closePanels());

    function closePanels(): void {
      const keys: string[] = Object.keys(self.isToggled.top);
      keys.forEach((key: string) => (self.isToggled.top[key] = false));
    }
  }

  toggle(side: string, name: string): void {
    this.isToggled[side][name] = !this.isToggled[side][name];
  }
  toggleScreenShare(): void {
    const isToggled: boolean = this.isToggled.bottom.screenShare;

    if (!isToggled) this.$emit("shareScreen");
    else {
      const track: MediaStreamTrack = this.streams.local.getVideoTracks()[0];
      if (track.onended == null) return;
      track.stop();
      track.onended(new Event("ended"));
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
