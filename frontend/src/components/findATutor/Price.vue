<template>
  <ExpandableSlider
    :value="value"
    :isError="isError"
    @input="emit"
    :label="$l('find.filters.price.h')"
    :text="`${value[0]} - ${value[1]} UC/${$l('find.filters.price.p')}`"
    :min="0"
    :max="150"
    :flat="settings.flat"
    :backgroundColor="settings.backgroundColor"
    :borderRadius="'0px 0px 15px 15px'"
  />
</template>

<script lang="ts">
import ExpandableSlider from "@/components/filterPanel/ExpandableSlider.vue";
import { Component } from "vue-property-decorator";
import { panel } from "./settings";
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

@Component({ components: { ExpandableSlider } })
export default class Price extends FieldClass<[number, number]> {
  get settings() {
    return panel;
  }
}
</script>
