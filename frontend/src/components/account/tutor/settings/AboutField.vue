<template>
  <TextField
    :value="value"
    @input="emit"
    :isError="isError"
    :errMsg="isError.msg"
    :area="true"
    :label="$l('set_up.about')"
    :borderRadius="'0px 0px 15px 15px'"
  />
</template>

<script lang="ts">
import TextField from "@/components/filterPanel/TextField.vue";

import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

import { Component } from "vue-property-decorator";
@Component({ components: { TextField } })
export default class AboutField extends FieldClass<string> {}
</script>
