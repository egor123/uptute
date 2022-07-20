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
import { Vue, Component, Prop } from "vue-property-decorator";
import { panel } from "./settings";
import { IsError } from "./types";

@Component({ components: { ExpandableSlider } })
export default class Price extends Vue {
  @Prop(Array) readonly value!: [number, number];
  @Prop() readonly isError!: IsError;

  get settings() {
    return panel;
  }

  emit(value: [number, number]) {
    this.$emit("input", value);
  }
 
}
</script>
