<template>
  <v-expansion-panel active-class="activePanel" id="panel">
    <v-expansion-panel-header class="panelHeader">
      {{ $l("find.filters.tutor_age.h") }}
      <div class="text-right mr-3 secondary--text text--darken-2">
        {{ value }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <p>{{ age[0] }} - {{ age[1] }} {{ $l("find.filters.tutor_age.p") }}</p>
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
    value: function(val) {
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

.panelHeader:hover {
  border-radius: 0 0 15px 15px;
}

.activePanel .panelHeader {
  border-radius: 0 !important;
}

.activePanel#panel {
  border-radius: 0 0 15px 15px !important;
}
</style>
