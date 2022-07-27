<template>
  <NameTextField
    :value="value"
    @input="emit"
    :isError="isError"
    borderRadius="0px 0px 15px 15px"
    :label="$l('set_up.surname')"
  />
</template>

<script lang="ts">
import NameTextField from "@/components/account/NameTextField.vue";
import { IsError } from "@/types";

import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: { NameTextField } })
export default class SurnameField extends Vue {
  @Prop(String) readonly value!: string;
  @Prop() readonly isError!: IsError;

  emit = (input: string) => this.$emit("input", input);
}
</script>
