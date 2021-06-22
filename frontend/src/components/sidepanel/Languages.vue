<template>
  <v-expansion-panel active-class="activePanel" id="panel">
    <v-expansion-panel-header class="panelHeader">
      {{ $l("find.filters.language.h") }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-virtual-scroll height="150" item-height="40" :items="getLanguages()">
        <template v-slot:default="{ item }">
          <v-list-item :key="item">
            <v-checkbox
              v-model="languages"
              v-on="handleInput()"
              :value="item"
              :label="$l('data.languages.' + item)"
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
      languages: this.value,
    };
  },
  props: ["value"],
  methods: {
    getLanguages() {
      //TO DO!!!!!!!!!!!!
      return ["en", "est", "ru"];
    },
    handleInput() {
      this.$emit("input", this.languages);
    },
  },
  watch: {
    value: function(val) {
      this.languages = val;
    },
  },
};
</script>
