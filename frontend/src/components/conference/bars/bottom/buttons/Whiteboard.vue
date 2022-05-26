<template>
  <BtnBase
    @click="toggleStore.toggle({ side: 'bottom', name: 'whiteBoard' })"
    :icons="icons"
    :isToggled="toggleStore.isToggled.bottom.whiteboard"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Icons } from "@/interfaces/Conference";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { BtnBase } })
export default class WhiteboardBtn extends Vue {
  toggleStore = ToggleStore;
  icons: Icons = { on: "window-close", off: "draw" };
}
</script>
