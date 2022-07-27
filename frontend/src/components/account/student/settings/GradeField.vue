<template>
  <ExpandableSlider
    :value="value"
    :isError="isError"
    @input="emit"
    :label="$l('set_up.grade')"
    :text="value"
    :min="1"
    :max="12"
    borderRadius="15px"
    :flat="false"
  />
</template>

<script lang="ts">
import { IsError } from "@/types";
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import { Details } from "../../types";
import ExpandableSlider from "@/components/filterPanel/ExpandableSlider.vue";

@Component({ components: { ExpandableSlider } })
export default class GradeField extends Vue {
  @Prop(Number) readonly value!: Details.Grade;
  @Prop(Object) readonly isError!: IsError;

  emit(v: Details.Grade) {
    this.$emit("input", v);
  }
}
</script>
