<template>
  <BtnBase
    @click="toggleStore.toggle({ side: 'top', name: 'settings' })"
    :isToggled="toggleStore.isToggled.top.settings"
    :icons="icons"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Icons } from "@/interfaces/Conference";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { BtnBase } })
export default class SettingsBtn extends Vue {
  toggleStore = ToggleStore;
  icons: Icons = { on: "window-close", off: "cog" };
}
</script>
