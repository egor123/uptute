<template>
  <div id="wrapper">
    <FilterPanel>
      <GradeField
        :value="v.grade.value"
        @input="updateGrade"
        :isError="v.grade.isError"
      />
    </FilterPanel>
  </div>
</template>

<script lang="ts">
import FilterPanel from "@/components/filterPanel/FilterPanel.vue";
import GradeField from "@/components/account/student/settings/GradeField.vue";

import { Vue, Component, Prop } from "vue-property-decorator";
import { Details as D } from "./types";
import { Details } from "./classes/Details";
import { getUpdatedFields } from "@/utility/validate";

@Component({ components: { FilterPanel, GradeField } })
export default class StudentSettings extends Vue {
  @Prop({ type: Object, default: () => new Details.Student() })
  readonly value!: D.Student;

  get v() {
    return this.value;
  }

  updateGrade(value: D.Grade) {
    this.$emit("input", getUpdatedFields(this.value, "grade", value));
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#wrapper {
  width: 25rem;
  @media (max-width: 450px) {
    width: 100%;
    padding: 0 1rem;
  }
}
</style>
