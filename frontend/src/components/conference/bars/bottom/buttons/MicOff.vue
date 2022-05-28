<template>
  <BtnBase
    @click="ToggleStore.toggle({ side: 'bottom', name: 'micOff' })"
    :icons="icons"
    :isToggled="ToggleStore.isToggled.bottom.micOff"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Icons } from "@/components/conference/types";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { BtnBase } })
export default class MicOffBtn extends Vue {
  ToggleStore = ToggleStore;
  icons: Icons = { on: "microphone-off", off: "microphone" };
}
</script>
