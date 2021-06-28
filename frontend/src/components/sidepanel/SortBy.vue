<template>
  <BaseComponent
    ref="base"
    v-model="filter"
    :default="'raiting'"
    :rules="() => true"
    :label="$l('find.filters.filters.h')"
    :text="$l('find.filters.filters.' + filter)"
    propURL="filter"
  >
    <v-radio-group v-model="filter">
      <v-radio
        color="accent"
        v-for="item in getFilters()"
        :key="item"
        :value="item"
        :label="$l('find.filters.filters.' + item)"
      />
    </v-radio-group>
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
      filter: "",
    };
  },
  methods: {
    getFilters() {
      //TO DO!!!!!!!!!!!!!!!
      return ["raiting", "price", "hours_tought"];
    },
  },
};
</script>