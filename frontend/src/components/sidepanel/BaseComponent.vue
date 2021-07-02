<template>
  <v-expansion-panel
    :slider="slider"
    id="panel"
    :class="{ errorMovement: errorAnim }"
  >
    <v-expansion-panel-header id="header" :class="{ errorColor: error }">
      {{ label }}
      <div
        class="text-right mr-3 secondary--text text--darken-2"
        :class="{ errorColor: error }"
      >
        {{ getText() }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content id="expPanelContent">
      <v-text-field
        v-if="search === 'true'"
        v-model="searchStr"
        :label="$l('find.filters.subject.search')"
        append-icon="mdi-magnify"
        single-line
        hide-details
      />
      <div id="scroll">
        <slot />
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  data: () => ({
    searchStr: "",
    error: false,
    errorAnim: false,
  }),
  props: [
    "value", // v-model
    "default", // default value
    "rules", // validation, always true if undef
    "label", // panel's label
    "text", // panel's text
    "propURL", // prop's name in URL query
    "search", // shows search panel if true, can be accesed by @search
    "slider", // changes styles for slider content if true
    // also required: ref="base"
  ],
  mounted() {
    var emit = this.default;
    var val = this.$route.query[this.propURL];
    if(val !== undefined)
      emit = JSON.parse(val);
    this.emit(emit); 
  },
  watch: {
    value: function (val) {
      var params = JSON.parse(JSON.stringify(this.$route.query));
      params[this.propURL] = JSON.stringify(val);
      this.$router.replace({ query: params }).catch(() => {});
      if (this.verify()) this.error = false;
    },
    searchStr: function (val) {
      this.$emit("search", val);
    },
  },
  methods: {
    refresh() {
      // refresh value
      this.emit(this.default);
    },
    isValid() {
      // check if value is valid
      const val = this.verify();
      this.errorAnim = false;
      setTimeout(() => {
        this.errorAnim = !val;
      }, 50);
      this.error = !val;
      return val;
    },
    emit(val) {
      if (Array.isArray(this.default) && !Array.isArray(val)) val = [val];
      this.$emit("input", val);
    },
    getText() {
      return this.text ?? "";
    },
    verify() {
      if (this.rules === undefined) return true;
      return this.rules(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
#scroll {
  overflow-y: auto;
  overflow-x: visible;
  max-height: 150px;
  padding: .8rem 0.6rem 0 0.6rem;
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

#panel {
  transition: transform 400ms;
  border-radius: 0;
  margin: 0;
  &:hover {
    transform: scale(0.95);
  }
  &:first-child {
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
  }
  &:last-child {
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
    overflow: hidden;
  }
  &[slider="true"] {
    ::v-deep #expPanelContent > * {
      padding: 0;
    }
    #scroll {
      padding: 30px 25px 0 25px;
    }
  }
}

.errorColor {
  color: var(--v-error-base) !important;
}
.errorMovement {
  animation: errorAnimation 1100ms ease-in-out;
}

@keyframes errorAnimation {
  0% {
    transform: translateX(0rem);
  }
  25% {
    transform: translateX(-0.8rem);
  }
  50% {
    transform: translateX(0.5rem);
  }
  75% {
    transform: translateX(-0.3rem);
  }
  100% {
  }
}
</style>
