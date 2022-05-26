<template>
  <BtnBase
    @click="toggleStore.toggle({ side: 'top', name: 'chat' })"
    :isToggled="toggleStore.isToggled.top.chat"
    :icons="icons"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Icons } from "@/components/conference/types";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { BtnBase } })
export default class ChatBtn extends Vue {
  toggleStore = ToggleStore;
  icons: Icons = { on: "window-close", off: "message" };
}
</script>
