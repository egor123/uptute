<template>
  <BtnBase
    @click="$emit('click')"
    :icons="icons"
    :isToggled="isToggled.bottom.micOff"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import { Icons, IsToggled } from "@/interfaces/Conference";
import { Vue, Component, InjectReactive } from "vue-property-decorator";

@Component({
  components: { BtnBase },
})
export default class MicOffBtn extends Vue {
  icons: Icons = {
    on: "microphone-off",
    off: "microphone",
  };

  @InjectReactive() isToggled!: IsToggled;
}
</script>
