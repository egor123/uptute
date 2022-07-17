<template>
  <FilterPanel>
    <ExpandableSortBy
      :value="value"
      @input="(v) => $emit('input', v)"
      :filters="[
        { name: 'rating', dir: 'up' },
        { name: 'price', dir: 'up' },
        { name: 'hours_taught', dir: 'up' },
      ]"
      :label="$l('find.filters.filters.h')"
      :flat="false"
      :text="`
        ${$l('find.filters.filters.' + value.name)}
        ${value.dir === 'up' ? '↑' : '↓'}
      `"
      :convertor="(item) => $l('find.filters.filters.' + item.name)"
      borderRadius="15px"
    />
  </FilterPanel>
</template>

<script lang="ts">
import FilterPanel from "@/components/filterPanel/FilterPanel.vue";
import ExpandableSortBy from "@/components/filterPanel/ExpandableSortBy.vue";

import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: { FilterPanel, ExpandableSortBy } })
export default class ChooseATutorSortBy extends Vue {
  @Prop(Object) readonly value!: { name: string; dir: "up" | "down" };
}
</script>

