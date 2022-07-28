<template>
  <ExpandableListSelector
    :value="value"
    @input="emit"
    :isError="isError"
    :label="$l('set_up.subjects')"
    :text="value.map((l) => $l('data.subjects.' + l)).join(', ')"
    :list="SUBJECTS"
    :convertor="convertor"
    :searchLabel="$l('find.filters.subject.search')"
    borderRadius="15px 15px 0px 0px"
    :multiple="true"
  />
</template>

<script lang="ts">
import ExpandableListSelector from "@/components/filterPanel/ExpandableListSelector.vue";
import { SUBJECTS } from "@/constants/index";

import { Subject } from "@/types";
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

import { Component } from "vue-property-decorator";
@Component({ components: { ExpandableListSelector } })
export default class SubjectField extends FieldClass<Subject[]> {
  public SUBJECTS = SUBJECTS;
  convertor = (subject: Subject) => this.$l("data.subjects." + subject);
}
</script>
