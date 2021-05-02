<template>
  <v-expansion-panel id="panel">
    <v-expansion-panel-header id="header">
      {{ $l("find.filters.tutor_age.h") }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      {{ age[0] }}-{{ age[1] }} {{ $l("find.filters.tutor_age.p") }}
      <div id="slider">
        <v-range-slider
          v-model="age"
          @input="handleInput"
          min="14"
          max="21"
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
      age: this.value,
    };
  },
  props: ["value"],
  watch: {
    value: function (val) {
      this.age = val;
    },
  },
  methods: {
    handleInput() {
      this.$emit("input", this.age);
    },
  },
};
</script>
<style scoped>
#slider {
  margin-top: 25px;
}
</style>