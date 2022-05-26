<template>
  <BtnBase
    @click="toggleStore.toggle({ side: 'bottom', name: 'camOff' })"
    :isToggled="toggleStore.isToggled.bottom.camOff"
    :icons="icons"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Icons } from "@/components/conference/types";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { BtnBase } })
export default class CamOffBtn extends Vue {
  toggleStore = ToggleStore;
  icons: Icons = { on: "video-off", off: "video" };
}
</script>
