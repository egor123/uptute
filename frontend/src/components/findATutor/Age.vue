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
import { Age, IsError } from "./types";

import { Vue, Component, Prop} from "vue-property-decorator";

@Component({ components: { ExpandableSlider } })
export default class AGe extends Vue {
  @Prop(Array) readonly value!: Age;
  @Prop(Object) readonly isError!: IsError;

  get settings() {
    return panel;
  }

  rules(value: Age) {
    return value.length > 0;
  }
  emit(value: Age) {
    this.$emit("input", value)
  }
}
</script>
