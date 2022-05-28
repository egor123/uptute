<template>
  <BtnBase
    @click="ToggleStore.toggle({ side: 'bottom', name: 'end' })"
    :isToggled="ToggleStore.isToggled.bottom.end"
    :icons="icons"
    bgColor="var(--v-error-darken1)"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/centerColumn/bars/BtnBase.vue";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Icons } from "@/components/conference/types";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { BtnBase } })
export default class EndBtn extends Vue {
  ToggleStore = ToggleStore;
  icons: Icons = { on: "phone-hangup", off: "phone-hangup" };
}
</script>
