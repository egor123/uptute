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
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

import { Component } from "vue-property-decorator";

@Component({ components: { ExpandableCalendar } })
export default class BirthdatField extends FieldClass<string> {}
</script>
