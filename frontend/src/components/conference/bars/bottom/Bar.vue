<template>
  <BarBase :isTopBar="false">
    <MicOff :isToggled="isToggled.micOff" @click="$emit('toggleMicOff')" />
    <CamOff :isToggled="isToggled.camOff" @click="$emit('toggleCamOff')" />
    <End :isToggled="isToggled.end" @click="$emit('toggleEnd')" />
    <ScreenShare
      :isToggled="isToggled.screenShare"
      @click="$emit('toggleScreenShare')"
    />
    <Whiteboard
      :isToggled="isToggled.whiteboard"
      @click="$emit('toggleWhiteboard')"
    />
  </BarBase>
</template>

<script>
import BarBase from "@/components/conference/bars/BarBase.vue";
import MicOff from "@/components/conference/bars/bottom/buttons/MicOff.vue";
import CamOff from "@/components/conference/bars/bottom/buttons/CamOff.vue";
import End from "@/components/conference/bars/bottom/buttons/End.vue";
import ScreenShare from "@/components/conference/bars/bottom/buttons/ScreenShare.vue";
import Whiteboard from "@/components/conference/bars/bottom/buttons/Whiteboard.vue";

export default {
  components: { BarBase, MicOff, CamOff, End, ScreenShare, Whiteboard },
  props: {
    isToggled: Object,
  },
};
</script>
