<template>
  <ExpandableListSelector
    ref="Parent"
    :value="value"
    :isError="isError"
    @input="emit"
    :label="$l('find.filters.subject.h')"
    :text="$l(`data.subjects.${value}`)"
    :list="SUBJECTS"
    :convertor="convertor"
    :searchLabel="$l('find.filters.subject.search')"
    :flat="settings.flat"
    :backgroundColor="settings.backgroundColor"
    :borderRadius="'15px 15px 0px 0px'"
  />
</template>

<script lang="ts">
import ExpandableListSelector from "@/components/filterPanel/ExpandableListSelector.vue";
import { panel } from "./settings";
import { Subject } from "@/types";
import { SUBJECTS } from "@/constants/index";

import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { IsError } from "./types";

@Component({ components: { ExpandableListSelector } })
export default class SubjectPanel extends Vue {
  @Ref() readonly Parent!: typeof ExpandableListSelector;

  @Prop(String) readonly value!: Subject;
  @Prop(Object) readonly isError!: IsError;

  get SUBJECTS() {
    return SUBJECTS;
  }
  get settings() {
    return panel;
  }

  emit(value: Subject) {
    this.$emit("input", value);
  }
  convertor(subject: Subject) {
    return this.$l(`data.subjects.${subject}`);
  }
}
</script>
