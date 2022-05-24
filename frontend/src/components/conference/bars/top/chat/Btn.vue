<template>
  <BtnBase
    @click="$emit('click')"
    id="chat"
    :icons="icons"
    :isToggled="isToggled.top.chat"
  />
</template>

<script lang="ts">
import BtnBase from "@/components/conference/bars/BtnBase.vue";

import { IsToggled, Icons } from "@/interfaces/Conference";
import { Vue, Component, InjectReactive } from "vue-property-decorator";

@Component({
  components: { BtnBase },
})
export default class ChatBtn extends Vue {
  icons: Icons = {
    on: "window-close",
    off: "message",
  };
  @InjectReactive() readonly isToggled!: IsToggled;
}
</script>

<style lang="scss" scoped></style>
