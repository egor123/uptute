<template>
  <VideoBase :isLocal="true" :muted="true" />
</template>

<script lang="ts">
import VideoBase from "@/components/conference/video/VideoBase.vue";

import Main from "@/store/modules/conference/main";
import { IsToggled } from "@/interfaces/Conference";
import { Vue, Component, Watch, InjectReactive } from "vue-property-decorator";

@Component({
  components: { VideoBase },
})
export default class LocalVideo extends Vue {
  @InjectReactive() readonly isToggled!: IsToggled;

  @Watch("isToggled.bottom.camOff")
  onCamOffToggle(isCamOff: boolean) {
    Main.toggleCam(!isCamOff);
  }
  @Watch("isToggled.bottom.micOff")
  onMicOffToggle(isMicOff: boolean) {
    Main.toggleMic(!isMicOff);
  }
}
</script>
