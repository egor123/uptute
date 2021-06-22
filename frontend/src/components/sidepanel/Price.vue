<template>
  <v-expansion-panel active-class="activePanel" id="panel">
    <v-expansion-panel-header class="panelHeader">
      {{ $l("find.filters.price.h") }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <p>{{ price[0] }} - {{ price[1] }} €/{{ $l("find.filters.price.p") }}</p>
      <div id="slider">
        <v-range-slider
          v-model="price"
          @input="handleInput"
          min="0"
          max="15"
          step="1"
          thumb-label="always"
          :thumb-size="20"
          color="accent"
        />
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  data() {
    return {
      price: this.value,
    };
  },
  props: ["value"],
  watch: {
    value: function(val) {
      this.price = val;
    },
  },
  methods: {
    handleInput() {
      this.$emit("input", this.price);
    },
  },
};
</script>
<style scoped>
#slider {
  margin-top: 25px;
}
</style>
