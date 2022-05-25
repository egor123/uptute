<template>
  <BtnBase
    @click="emit()"
    id="settings"
    :icons="icons"
    :isToggled="isToggled.top.settings"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";
import Interface from "@/components/conference/Interface.vue";

import {
  IsToggled,
  Icons,
  ButtonToggleEventPayload,
} from "@/interfaces/Conference";
import { Vue, Component, InjectReactive } from "vue-property-decorator";

@Component({
  components: { BtnBase },
})
export default class SettingsBtn extends Vue {
  icons: Icons = {
    on: "window-close",
    off: "cog",
  };

  @InjectReactive() readonly isToggled!: IsToggled;
  @InjectReactive() readonly interfaceInstance!: Interface;

  emit() {
    const payload: ButtonToggleEventPayload = { side: "top", name: "settings" };
    this.interfaceInstance.$emit("buttonToggle", payload);
  }
}
</script>

<style lang="scss" scoped></style>
