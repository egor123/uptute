<template>
  <BtnBase
    @click="toggleStore.toggle({ side: 'bottom', name: 'screenShare' })"
    :icons="icons"
    :isToggled="toggleStore.isToggled.bottom.screenShare"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Icons } from "@/components/conference/types";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { BtnBase } })
export default class screenShareBtn extends Vue {
  toggleStore = ToggleStore;
  icons: Icons = { on: "window-close", off: "monitor-share" };
}
</script>
