<template>
  <v-expansion-panel active-class="activePanel" id="panel">
    <v-expansion-panel-header class="panelHeader">
      {{ $l("find.filters.audience.h") }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div id="slider">
        <v-slider
          v-model="grade"
          @input="handleInput"
          step="1"
          min="1"
          max="12"
          thumb-label="always"
          :thumb-size="20"
          color="accent"
        ></v-slider>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  data() {
    return {
      grade: this.value,
    };
  },
  props: ["value"],
  watch: {
    value: function(val) {
      this.grade = val;
    },
  },
  methods: {
    handleInput() {
      this.$emit("input", this.grade);
    },
  },
};
</script>
<style scoped>
#slider {
  margin-top: 25px;
}
</style>
