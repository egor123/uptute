<template>
  <BaseComponent
    ref="base"
    :isError="isError"
    :label="label"
    :text="text"
    :flat="flat"
    :backgroundColor="backgroundColor"
    :borderRadius="borderRadius"
  >
    <v-text-field
      v-if="searchLabel !== undefined"
      v-model="searchStr"
      :label="searchLabel"
      append-icon="mdi-magnify"
      single-line
      hide-details
    />
    <div id="scroll">
      <div v-for="el in list" :key="el" class="btn" v-show="show(el)">
        <RadioButton
          v-if="!Array.isArray(def)"
          :value="el"
          v-model="input"
          size="16"
        >
          {{ convert(el) }}
        </RadioButton>
        <v-checkbox
          v-else
          v-model="input"
          :value="el"
          :label="convert(el)"
          height="0"
          color="accent"
        />
      </div>
    </div>
  </BaseComponent>
</template>

<script>
import BaseComponent from "./ExpansionBaseComponent.vue";
import RadioButton from "@/components/global/RadioButton.vue";
import { refresh, isValid, convert, watch } from "./store.js";
export default {
  components: {
    BaseComponent,
    RadioButton,
  },
  data() {
    return {
      searchStr: "",
      input: this.value,
      def: JSON.parse(JSON.stringify(this.value)),
    };
  },
  props: [
    "value",
    "isError",
    "label",
    "text",
    "list",
    "convertor",
    "searchLabel",
    "rules",
    "flat",
    "backgroundColor",
    "borderRadius",
  ],
  methods: {
    refresh,
    isValid,
    convert,
    show(item) {
      if (this.searchStr === "") return true;
      return this.convert(item)
        .toLowerCase()
        .includes(this.searchStr.toLowerCase());
    },
  },
  watch,
};
</script>
<style lang="scss" scoped>
#scroll {
  @-moz-document url-prefix() {
    scrollbar-width: none;
  }

  overflow-y: auto;
  overflow-x: visible;
  max-height: 150px;
  margin-top: 1rem;
  padding: 0 0.6rem 0 0.6rem;

  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--v-innerThumb-base);
    &:hover {
      background: var(--v-innerThumbHover-base);
    }
  }
}

.btn {
  text-align: left;
  display: flex;
  align-items: center;
  & + & {
    margin-top: 0.2rem;
  }
}
</style>
