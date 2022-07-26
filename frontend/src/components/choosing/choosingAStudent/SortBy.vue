<template>
  <SortBy
    :value="value"
    @input="emit"
    :filters="filters"
    :label="$l('find.filters.filters.h')"
    :flat="false"
    :text="text"
    :convertor="convertor"
  />
</template>

<script lang="ts">
import SortBy from "@/components/filterPanel/ExpandableSortBy.vue";

import { Vue, Component, Prop } from "vue-property-decorator";
import { Filter } from "./type";

@Component({ components: { SortBy } })
export default class ChooseAStudetSortby extends Vue {
  @Prop() readonly value!: Filter;
  filters: Filter[] = [
    { name: "time", dir: "up" },
    { name: "subject", dir: "up" },
    { name: "grade", dir: "up" },
  ];

  get text() {
    const name = this.$l("find.filters.filters." + this.value.name);
    const dir = this.value.dir === "up" ? "↑" : "↓";
    return name + " " + dir;
  }

  emit(value: Filter) {
    this.$emit("input", value);
  }
  convertor(value: Filter) {
    return this.$l("find.filters.filters." + value.name);
  }
}
</script>
