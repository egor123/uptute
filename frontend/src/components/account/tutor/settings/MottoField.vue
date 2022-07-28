<template>
  <TextField
    :value="value"
    @input="emit"
    :isError="isError"
    :errMsg="isError.msg"
    :label="$l('set_up.motto')"
    :borderRadius="'15px 15px 0px 0px'"
  />
</template>

<script lang="ts">
import TextField from "@/components/filterPanel/TextField.vue";

import { IsError } from "@/types";
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

import { Vue, Component, Prop } from "vue-property-decorator";
@Component({ components: { TextField } })
export default class MottoField extends FieldClass<string> {}
</script>
