<template>
  <ExpandableSlider
    :value="value"
    @input="emit"
    :isError="isError"
    :label="$l('find.filters.audience.h')"
    :text="value.join(' - ')"
    :min="1"
    :max="12"
    borderRadius="0px"
  />
</template>

<script lang="ts">
import ExpandableSlider from "@/components/filterPanel/ExpandableSlider.vue";
import { Grade } from "@/types";
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

import { Component } from "vue-property-decorator";
@Component({ components: { ExpandableSlider } })
export default class SubjectField extends FieldClass<[Grade, Grade]> {}
</script>
