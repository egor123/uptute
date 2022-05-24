<template>
  <BtnBase
    @click="$emit('click')"
    :icons="icons"
    :isToggled="isToggled.bottom.end"
    bgColor="var(--v-error-darken1)"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import { Icons, IsToggled } from "@/interfaces/Conference";
import { Vue, Component, InjectReactive } from "vue-property-decorator";

@Component({
  components: { BtnBase },
})
export default class EndBtn extends Vue {
  icons: Icons = {
    on: "phone-hangup",
    off: "phone-hangup",
  };

  @InjectReactive() isToggled!: IsToggled;
}
</script>
