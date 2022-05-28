<template>
  <BarBase :isTopBar="false">
    <MicOff />
    <CamOff />
    <End />
    <ScreenShare />
    <Whiteboard />
  </BarBase>
</template>

<script lang="ts">
import BarBase from "@/components/conference/centerColumn/bars/BarBase.vue";

import MicOff from "@/components/conference/centerColumn/bars/bottom/buttons/MicOff.vue";
import CamOff from "@/components/conference/centerColumn/bars/bottom/buttons/CamOff.vue";
import End from "@/components/conference/centerColumn/bars/bottom/buttons/End.vue";
import ScreenShare from "@/components/conference/centerColumn/bars/bottom/buttons/ScreenShare.vue";
import Whiteboard from "@/components/conference/centerColumn/bars/bottom/buttons/Whiteboard.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { BarBase, MicOff, CamOff, End, ScreenShare, Whiteboard },
})
export default class BottomBar extends Vue {}
</script>
