<template>
  <TextField
    :value="value"
    :isError="isError"
    :errMsg="isError.msg"
    @input="emit"
    :label="$l('find.filters.topic')"
    :area="false"
    :flat="settings.flat"
    :backgroundColor="settings.backgroundColor"
    :borderRadius="'0px'"
  />
</template>

<script lang="ts">
import TextField from "@/components/filterPanel/TextField.vue";
import { panel } from "./settings";

import { Component } from "vue-property-decorator";
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

@Component({ components: { TextField } })
export default class FindATutorTopicPanel extends FieldClass<string> {
  get settings() {
    return panel;
  }
}
</script>
