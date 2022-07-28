<template>
  <ExpandableListSelector
    :value="value"
    @input="emit"
    :isError="isError"
    :label="$l('find.filters.language.h')"
    :text="value.map((l) => $l('data.languages.' + l)).join(', ')"
    :list="LANGUAGES"
    :convertor="convertor"
    :searchLabel="$l('find.filters.language.search')"
    borderRadius="0px 0px 15px 15px"
    :multiple="true"
  />
</template>

<script lang="ts">
import ExpandableListSelector from "@/components/filterPanel/ExpandableListSelector.vue";
import { LANGUAGES } from "@/constants/index";

import { Language } from "@/types";
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

import { Component } from "vue-property-decorator";
@Component({ components: { ExpandableListSelector } })
export default class LanguageField extends FieldClass<Language[]> {
  public LANGUAGES = LANGUAGES;
  convertor = (language: Language) => this.$l("data.languages." + language);
}
</script>
