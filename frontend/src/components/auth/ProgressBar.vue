<template>
  <v-progress-linear
    :value="progress"
    :color="progressColor"
    absolute
    class="progressBar"
  />
</template>

<script lang="ts">
import { password as config } from "./config";

import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ProgressBar extends Vue {
  @Prop(String) readonly value!: string;

  get progressColor() {
    const val = this.value.length;
    if (val < config.length.min || val > config.length.max) return "error";
    if (val < config.length.max / 20 + config.length.min) return "warning";
    return "success";
  }
  get progress() {
    return (this.value.length / config.length.max) * 100;
  }
}
</script>

<style lang="scss" scoped>
.progressBar {
  $bar_height: 4px;
  height: $bar_height !important;
  margin-top: -0.5 * $bar_height;
  opacity: 0.5;
}
</style>
