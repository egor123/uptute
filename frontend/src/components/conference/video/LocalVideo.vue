<template>
  <VideoBase :isLocal="true" :muted="true" />
</template>

<script lang="ts">
import VideoBase from "@/components/conference/video/VideoBase.vue";

import { Streams, IsToggled } from "@/interfaces/Conference";
import { Vue, Component, Watch, InjectReactive } from "vue-property-decorator";

@Component({
  components: { VideoBase },
})
export default class LocalVideo extends Vue {
  @InjectReactive() readonly streams!: Streams;
  @InjectReactive() readonly isToggled!: IsToggled;

  @Watch("isToggled.bottom.camOff")
  onCamOffToggle(isCamOff: boolean) {
    this.streams.local.getVideoTracks()[0].enabled = !isCamOff;
  }
  @Watch("isToggled.bottom.micOff")
  onMicOffToggle(isMicOff: boolean) {
    this.streams.local.getAudioTracks()[0].enabled = !isMicOff;
  }
}
</script>
