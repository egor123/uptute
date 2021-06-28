<template>
  <BaseComponent
    ref="base"
    v-model="price"
    :default="[0, 15]"
    :rules="() => true"
    :label="$l('find.filters.price.h')"
    :text="`${price[0]} - ${price[1]} €/${$l('find.filters.price.p')}`"
    propURL="price"
  >
    <div id="slider">
      <v-range-slider
        v-model="price"
        min="0"
        max="15"
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
      price: [],
    };
  },
};
</script>
<style scoped>
#slider {
  padding: 30px 15px 0 15px;
}
::v-deep #scroll {
  padding: 0 !important;
}
</style>
