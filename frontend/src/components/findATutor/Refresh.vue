<template>
  <v-btn @click="$emit('click')" small text rounded id="refreshBtn">
    {{ $l("find.filters.refresh") }}
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Refresh extends Vue {}
</script>

<style scoped lang="scss">
#refreshBtn {
  color: var(--v-secondary-darken2);

  transition: background-color 600ms;
  &:hover {
    background-color: var(--v-secondary-darken1);
  }
}
</style>
