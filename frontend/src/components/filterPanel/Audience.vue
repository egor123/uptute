<template>
  <BaseComponent
    ref="base"
    v-model="grade"
    :default="[1, 12]"
    :label="$l('find.filters.audience.h')"
    :text="grade.join(' - ')"
    slider="true"
    propURL="grade"
  >
    <v-range-slider
      id="slider"
      v-model="grade"
      min="1"
      max="12"
      step="1"
      thumb-label="always"
      :thumb-size="25"
      color="accent"
    />
  </BaseComponent>
</template>
<script>
import BaseComponent from "./BaseComponent.vue";

export default {
  components: {
    BaseComponent,
  },
  data() {
    return {
      grade: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>
