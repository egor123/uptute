<template>
  <v-expansion-panel active-class="activePanel" id="panel">
    <v-expansion-panel-header class="panelHeader">
      {{ $l("find.filters.subject.h") }}
      <div class="text-right mr-3 secondary--text text--darken-2">
        {{ $l("data.subjects." + value) }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-text-field
        class="search"
        v-model="search"
        append-icon="mdi-magnify"
        :label="$l('find.filters.subject.search')"
        single-line
        hide-details
      ></v-text-field>
      <div class="scroll">
        <v-radio-group v-model="subject">
          <v-radio
            color="accent"
            v-for="item in getSubjects()"
            :key="item"
            v-on="handleInput()"
            :value="item"
            :label="$l('data.subjects.' + item)"
          />
        </v-radio-group>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { bus } from "@/main.js";

export default {
  data() {
    return {
      subject: this.value,
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
      this.$emit("input", this.subject);
    },
  },
  created() {
    bus.$on("searchCheck", () => {
      bus.$emit("searchCheckFeedback", this.subject);
    });
  },
  watch: {
    value: function(val) {
      this.subjects = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin: 10px;
}

.activePanel#panel {
  border-radius: 15px 15px 0 0 !important;
}

.scroll {
  overflow-y: scroll;
  height: 150px;
  padding: 0 10px;

  &::-webkit-scrollbar-track {
    background: var(--v-secondary-base);
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--v-secondary-darken2);
    &:hover {
      background: var(--v-secondary-darken3);
    }
  }
}
</style>
