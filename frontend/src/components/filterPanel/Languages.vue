<template>
  <BaseComponent
    ref="base"
    v-model="languages"
    :default="[]"
    :rules="(val) => val.length > 0"
    :label="$l('find.filters.language.h')"
    :text="languages.map((l) => this.$l('data.languages.' + l)).join(', ')"
    propURL="language"
  >
    <v-checkbox
      v-for="item in getLanguages()"
      v-model="languages"
      :key="item"
      :value="item"
      :label="$l('data.languages.' + item)"
      height="0"
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
      languages: [],
    };
  },
  methods: {
    getLanguages() {
      //TO DO!!!!!!!!!!!!
      return ["en", "est", "ru"];
    },
  },
};
</script>
