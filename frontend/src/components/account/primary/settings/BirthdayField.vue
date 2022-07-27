<template>
  <ExpandableCalendar
    :value="value"
    @input="emit"
    :isError="isError"
    :label="$l('set_up.birth')"
    :text="value"
    borderRadius="15px"
    :flat="false"
  />
</template>

<script lang="ts">
import ExpandableCalendar from "@/components/filterPanel/ExpandableCalendar.vue";
import { IsError } from "@/types";

import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: { ExpandableCalendar } })
export default class BirthdatField extends Vue {
  @Prop(String) readonly value!: string;
  @Prop() readonly isError!: IsError;

  emit = (input: string) => this.$emit("input", input);
}
</script>
