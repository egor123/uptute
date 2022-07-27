<template>
  <NameTextField
    :value="value"
    @input="emit"
    :isError="isError"
    borderRadius="15px 15px 0px 0px"
    :label="$l('set_up.name')"
  />
</template>

<script lang="ts">
import NameTextField from "@/components/account/NameTextField.vue";
import { IsError } from "@/types";

import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";

@Component({ components: { NameTextField } })
export default class NameField extends Vue {
  @Prop(String) readonly value!: string;
  @Prop() readonly isError!: IsError;

  emit = (input: string) => this.$emit("input", input);
}
</script>
