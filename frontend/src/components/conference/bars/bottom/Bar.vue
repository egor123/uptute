<template>
  <BarBase :isTopBar="false">
    <MicOff @click="$emit('toggleMicOff')" />
    <CamOff @click="$emit('toggleCamOff')" />
    <End @click="$emit('toggleEnd')" />
    <ScreenShare @click="$emit('toggleScreenShare')" />
    <Whiteboard @click="$emit('toggleWhiteboard')" />
  </BarBase>
</template>

<script lang="ts">
import BarBase from "@/components/conference/bars/BarBase.vue";
import MicOff from "@/components/conference/bars/bottom/buttons/MicOff.vue";
import CamOff from "@/components/conference/bars/bottom/buttons/CamOff.vue";
import End from "@/components/conference/bars/bottom/buttons/End.vue";
import ScreenShare from "@/components/conference/bars/bottom/buttons/ScreenShare.vue";
import Whiteboard from "@/components/conference/bars/bottom/buttons/Whiteboard.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { BarBase, MicOff, CamOff, End, ScreenShare, Whiteboard },
})
export default class BottomBar extends Vue {}
</script>
