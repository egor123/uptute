<template>
  <TextField
    :value="value"
    :isError="isError"
    @input="emit"
    :label="$l('find.filters.details')"
    :area="true"
    :flat="settings.flat"
    :backgroundColor="settings.backgroundColor"
    :borderRadius="'0px 0px 15px 15px'"
  />
</template>

<script lang="ts">
import TextField from "@/components/filterPanel/TextField.vue";
import { panel } from "./settings";

import { Vue, Component, Prop } from "vue-property-decorator";
import { IsError } from "@/types";

@Component({ components: { TextField } })
export default class Details extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(Object) readonly isError!: IsError;

  get settings() {
    return panel;
  }

  emit(value: string) {
    this.$emit("input", value);
  }
}
</script>
