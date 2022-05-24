<template>
  <BtnBase
    @click="$emit('click')"
    id="settings"
    :icons="icons"
    :isToggled="isToggled.top.settings"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import { IsToggled, Icons } from "@/interfaces/Conference";
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
}
</script>

<style lang="scss" scoped></style>
