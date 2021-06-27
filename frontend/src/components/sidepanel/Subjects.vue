<template>
  <BaseComponent
    ref="base"
    v-model="subject"
    :default="''"
    :rules="(val) => val != ''"
    :label="$l('find.filters.subject.h')"
    :text="this.$l('data.subjects.' + subject)"
    :search="true"
    @search="(val) => (search = val)"
    propURL="subject"
  >
    <v-radio-group v-model="subject">
      <v-radio
        v-for="item in getSubjects()"
        v-show="show(item)"
        :key="item"
        :value="item"
        :label="$l('data.subjects.' + item)"
        color="accent"
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
      subject: "",
      search: "",
    };
  },
  methods: {
    getSubjects() {
      return ["math", "biol", "esl", "phys", "geog", "chem", "cis"]; //TO DO!!!!
    },
    show(item) {
      if (this.search === "") return true;
      return this.$l("data.subjects." + item)
        .toLowerCase()
        .includes(this.search.toLowerCase());
    },
  },
};
</script>