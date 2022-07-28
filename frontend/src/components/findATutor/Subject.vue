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

import { Component, Ref } from "vue-property-decorator";
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

@Component({ components: { ExpandableListSelector } })
export default class SubjectPanel extends FieldClass<Subject> {
  @Ref() readonly Parent!: typeof ExpandableListSelector;
  get SUBJECTS() {
    return SUBJECTS;
  }
  get settings() {
    return panel;
  }

  convertor(subject: Subject) {
    return this.$l(`data.subjects.${subject}`);
  }
}
</script>
