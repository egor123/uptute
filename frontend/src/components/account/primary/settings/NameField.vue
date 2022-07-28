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
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

import { Component } from "vue-property-decorator";

@Component({ components: { NameTextField } })
export default class NameField extends FieldClass<string> {}
</script>
