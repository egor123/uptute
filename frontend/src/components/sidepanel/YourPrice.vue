<template>
  <BaseComponent
    ref="base"
    v-model="price"
    :default="8"
    :label="$l('find.filters.price.h')"
    :text="`${price} €/${$l('find.filters.price.p')}`"
    slider="true"
    propURL="price"
  >
    <v-slider
      v-model="price"
      min="0"
      max="15"
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
      price: [],
    };
  },
};
</script>
