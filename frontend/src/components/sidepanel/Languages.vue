<template>
  <v-expansion-panel
    :class="{ noInputAnimation: noInput }"
    active-class="activePanel"
    id="panel"
  >
    <v-expansion-panel-header :class="{ noInput: noInput }" class="panelHeader">
      {{ $l("find.filters.language.h") }}
      <div
        :class="{ noInput: noInput }"
        class="text-right mr-3 secondary--text text--darken-2"
      >
        {{ value }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-virtual-scroll height="150" item-height="40" :items="getLanguages()">
        <template v-slot:default="{ item }">
          <v-list-item :key="item">
            <v-checkbox
              v-model="languages"
              v-on="handleInput()"
              :value="item"
              color="accent"
              :label="$l('data.languages.' + item)"
            />
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { bus } from "@/main.js";

export default {
  data() {
    return {
      languages: this.value,
      languagesString: "1",
      noInput: false,
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
    searchCheck() {},
  },
  created() {
    bus.$on("searchCheck", () => {
      bus.$emit("searchCheckFeedback", this.languages);
      if (this.languages.length === 0) {
        this.noInput = true;
      } else {
        this.noInput = false;
      }
    });
  },
  watch: {
    value: function(val) {
      this.languages = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.noInput {
  color: var(--v-error-base) !important;
}

.noInputAnimation {
  animation: noInputAnimation 800ms ease-in-out;
}

@keyframes noInputAnimation {
  0% {
    transform: translateX(0rem);
  }
  33% {
    transform: translateX(-0.8rem);
  }
  66% {
    transform: translateX(0.3rem);
  }
  100% {
    transform: translateX(0rem);
  }
}
</style>
