<template>
  <v-expansion-panel id="panel">
    <v-expansion-panel-header id="header">
      {{ $l("find.filters.subject.h") }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <p>{{ $l("find.filters.subject.p") }}</p>
      <v-text-field
        class="search"
        v-model="search"
        append-icon="mdi-magnify"
        :label="$l('find.filters.subject.search')"
        single-line
        hide-details
      ></v-text-field>
      <v-virtual-scroll height="150" item-height="40" :items="getSubjects()">
        <template v-slot:default="{ item }">
          <v-list-item :key="item">
            <v-checkbox
              v-model="subjects"
              v-on="handleInput()"
              :value="item"
              :label="$l('data.subjects.' + item)"
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
      subjects: this.value,
      search: "",
    };
  },
  props: ["value"],
  methods: {
    getSubjects() {
      //TO DO!!!!!!!!!!!!
      var array = ["math", "biol", "esl", "phys", "geog", "chem", "cis"];
      var values = [];
      array.forEach((item) => {
        if (
          this.$l("data.subjects." + item)
            .toLowerCase()
            .includes(this.search.toLowerCase())
        )
          values.push(item);
      });
      return values;
    },
    handleInput() {
      this.$emit("input", this.subjects);
    },
  },
  watch: {
    value: function (val) {
      this.subjects = val;
    },
  },
};
</script>
<style scoped>
.search {
  margin: 10px;
  }
</style>