<template>
  <BaseComponent
    ref="base"
    v-model="age"
    :default="[14, 21]"
    :label="$l('find.filters.tutor_age.h')"
    :text="age.join(' - ')"
    slider="true"
    propURL="age"
  >
      <v-range-slider
        v-model="age"
        min="14"
        max="21"
        step="1"
        thumb-label="always"
        :thumb-size="20"
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
      age: [],
    };
  },
};
</script>
