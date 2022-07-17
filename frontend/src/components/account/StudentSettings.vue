<template>
  <div id="wrapper">
    <FilterPanel ref="panelRef">
      <ExpandableSlider
        :value="value.grade"
        @input="(grade) => $emit('input', { ...value, grade })"
        :label="$l('set_up.grade')"
        :text="value.grade"
        :min="1"
        :max="12"
        borderRadius="15px"
        :flat="false"
      />
    </FilterPanel>
  </div>
</template>

<script lang="ts">
import FilterPanel from "@/components/filterPanel/FilterPanel.vue";
import ExpandableSlider from "@/components/filterPanel/ExpandableSlider.vue";

import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { Details as D } from "./types";
import { Details } from "./classes/details";

@Component({ components: { FilterPanel, ExpandableSlider } })
export default class StudentSettings extends Vue {
  @Ref() readonly panelRef!: InstanceType<typeof FilterPanel>;
  @Prop({ type: Object, default: () => new Details.Student() })
  readonly value!: D.Student;

  async isValid() {
    await this.panelRef.isValid();
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

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
}

#panels {
  border-radius: 15px;
}
</style>
