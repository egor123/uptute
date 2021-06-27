<template>
  <v-expansion-panels flat focusable hover class="expPanels">
    <v-expansion-panel active-class="activePanel" class="expPanel">
      <v-expansion-panel-header class="panelHeader">
        {{ $l("find.filters.filters.h") }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-radio-group v-model="filter">
          <v-radio
            color="accent"
            v-for="item in getFilters()"
            :key="item"
            v-on="handleInput()"
            :value="item"
            :label="$l('find.filters.filters.' + item)"
          />
        </v-radio-group>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
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
    value: function(val) {
      this.filter = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.expPanels {
  margin-top: 15px;
  border-radius: 15px !important;
}

.expPanel {
  border-radius: 15px !important;
}

.panelHeader {
  border-radius: 15px;
  transition: all 500ms;
}

.activePanel .panelHeader {
  border-radius: 15px 15px 0 0 !important;
}
</style>
