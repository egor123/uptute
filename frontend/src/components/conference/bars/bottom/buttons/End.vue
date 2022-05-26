<template>
  <BtnBase
    @click="toggleStore.toggle({ side: 'bottom', name: 'end' })"
    :isToggled="toggleStore.isToggled.bottom.end"
    :icons="icons"
    bgColor="var(--v-error-darken1)"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Icons } from "@/interfaces/Conference";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { BtnBase } })
export default class EndBtn extends Vue {
  toggleStore = ToggleStore;
  icons: Icons = { on: "phone-hangup", off: "phone-hangup" };
}
</script>
