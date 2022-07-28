<template>
  <ExpandableSlider
    :value="value"
    :isError="isError"
    @input="emit"
    :label="$l('find.filters.tutor_age.h')"
    :text="value.join(' - ')"
    :min="15"
    :max="100"
    :flat="settings.flat"
    :backgroundColor="settings.backgroundColor"
    :borderRadius="'0px'"
  />
</template>

<script lang="ts">
import ExpandableSlider from "@/components/filterPanel/ExpandableSlider.vue";
import { panel } from "./settings";
import { Age } from "./types";

import { Component } from "vue-property-decorator";
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

@Component({ components: { ExpandableSlider } })
export default class AGe extends FieldClass<Age> {
  get settings() {
    return panel;
  }
}
</script>
