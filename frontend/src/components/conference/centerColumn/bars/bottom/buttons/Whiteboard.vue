<template>
  <BtnBase
    @click="ToggleStore.toggle({ side: 'bottom', name: 'whiteboard' })"
    :icons="icons"
    :isToggled="ToggleStore.isToggled.bottom.whiteboard"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/centerColumn/bars/BtnBase.vue";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Icons } from "@/components/conference/types";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { BtnBase } })
export default class WhiteboardBtn extends Vue {
  ToggleStore = ToggleStore;
  icons: Icons = { on: "window-close", off: "draw" };
}
</script>
