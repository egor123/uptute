<template>
  <TextField
    :value="value"
    @input="emit"
    :isError="isError"
    :errMsg="isError.msg"
    :label="label"
    :borderRadius="borderRadius"
  />
</template>

<script lang="ts">
import TextField from "@/components/filterPanel/TextField.vue";

import { Vue, Component, Prop } from "vue-property-decorator";
import { IsError } from "@/types";

@Component({ components: { TextField } })
export default class NameTextField extends Vue {
  @Prop(String) readonly value!: string;
  @Prop() readonly isError!: IsError;
  @Prop({ type: String, default: "15px" }) readonly borderRadius!: string;
  @Prop(String) readonly label!: string;

  emit = (input: string) => this.$emit("input", input);
}
</script>
