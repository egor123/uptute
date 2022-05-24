<template>
  <BtnBase
    @click="$emit('click')"
    :icons="icons"
    :isToggled="isToggled.bottom.screenShare"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import { Icons, IsToggled } from "@/interfaces/Conference";
import { Vue, Component, InjectReactive } from "vue-property-decorator";

@Component({
  components: { BtnBase },
})
export default class screenShareBtn extends Vue {
  icons: Icons = {
    on: "window-close",
    off: "monitor-share",
  };

  @InjectReactive() isToggled!: IsToggled;
}
</script>
