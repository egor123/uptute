<template>
  <ExpandableListSelector
    :value="value"
    :isError="isError"
    :errMsg="isError.msg"
    @input="emit"
    :label="$l('find.filters.language.h')"
    :text="value.map((l) => $l(`data.languages.${l}`)).join(', ')"
    :list="LANGUAGES"
    :convertor="convertor"
    :flat="settings.flat"
    :backgroundColor="settings.backgroundColor"
    :borderRadius="'15px 15px 0px 0px'"
  />
</template>

<script lang="ts">
import ExpandableListSelector from "@/components/filterPanel/ExpandableListSelector.vue";
import { Language } from "@/types";
import { panel } from "./settings";
import { LANGUAGES } from "@/constants/index";

import { Vue, Component, Prop } from "vue-property-decorator";
import { IsError } from "@/types";

@Component({ components: { ExpandableListSelector } })
export default class Languages extends Vue {
  @Prop(Array) readonly value!: Language[];
  @Prop(Object) readonly isError!: IsError;

  get settings() {
    return panel;
  }
  get LANGUAGES() {
    return LANGUAGES;
  }

  convertor(language: Language) {
    return this.$l(`data.languages.${language}`);
  }
  emit(value: Language[]) {
    this.$emit("input", value);
  }
}
</script>
