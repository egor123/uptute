<template>
  <v-expansion-panel id="panel">
    <v-expansion-panel-header id="header">
      {{ $l("find.filters.filters.h") }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-virtual-scroll height="150" item-height="40" :items="getFilters()">
        <template v-slot:default="{ item }">
          <v-list-item :key="item">
            <v-checkbox
              v-model="filter"
              v-on="handleInput()"
              :value="item"
              :label="$l('find.filters.filters.' + item)"
            />
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  data() {
    return {
      filter: this.value,
    };
  },
  props: ["value"],
  methods: {
    getFilters() {
      //TO DO!!!!!!!!!!!!!!!
      return ["raiting", "price", "hours_tought"];
    },
    handleInput() {
      this.$emit("input", this.filter);
    },
  },
  watch: {
    value: function (val) {
      this.filter = val;
    },
  },
};
</script>