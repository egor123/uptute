<template>
  <ButtonBase :title="$l('set_up.as_tutor')" @click="$emit('click')" id="btn" />
</template>

<script lang="ts">
import ButtonBase from "@/components/global/ButtonBase.vue";

import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";

@Component({ components: { ButtonBase } })
export default class AsStudent extends Vue {}
</script>

<style scoped lang="scss">
#btn {
  border-radius: 0 15px 15px 0;
  border-left: 1px dashed var(--v-accent-base);
}
</style>
