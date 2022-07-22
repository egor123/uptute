<template>
  <div id="wrapper">
    <v-text-field
      :value="value"
      @input="(v) => $emit('input', v)"
      :readonly="readonly"
      :autofocus="autofocus"
      outlined
      dense
      rounded
      hide-details
      :suffix="suffix"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class component_name extends Vue {
  @Prop(String) readonly suffix!: string;
  @Prop(Number) readonly value!: number;
  @Prop({ type: Boolean, default: false }) readonly readonly!: boolean;
  @Prop({ type: Boolean, default: false }) readonly autofocus!: boolean;
}
</script>

<style scoped lang="scss">
#wrapper {
  width: 128px;
}
</style>
