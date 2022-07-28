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
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

import { Component } from "vue-property-decorator";

@Component({ components: { NameTextField } })
export default class SurnameField extends FieldClass<string> {}
</script>
