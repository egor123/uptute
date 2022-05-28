<template>
  <BtnBase
    @click="ToggleStore.toggle({ side: 'top', name: 'settings' })"
    :isToggled="ToggleStore.isToggled.top.settings"
    :icons="icons"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Icons } from "@/components/conference/types";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { BtnBase } })
export default class SettingsBtn extends Vue {
  ToggleStore = ToggleStore;
  icons: Icons = { on: "window-close", off: "cog" };
}
</script>
