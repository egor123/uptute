<template>
  <BaseComponent
    ref="base"
    v-model="age"
    :default="[14, 21]"
    :rules="() => true"
    :label="$l('find.filters.tutor_age.h')"
    :text="age.join(' - ')"
    propURL="age"
  >
    <div id="slider">
      <v-range-slider
        v-model="age"
        min="14"
        max="21"
        step="1"
        thumb-label="always"
        :thumb-size="20"
        color="accent"
      />
    </div>
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

<style scoped>
#slider {
  padding: 30px 15px 0 15px;
}
</style>
