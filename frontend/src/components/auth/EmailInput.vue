<template>
  <TextInput
    :value="value"
    @input="update"
    :rules="rules"
    :label="$l('auth.email')"
  />
</template>

<script lang="ts">
import TextInput from "./TextInput.vue";

import { Vue, Component } from "vue-property-decorator";
import Module from "@/store/modules/auth/credentials";
import { Rules } from "./types";

@Component({ components: { TextInput } })
export default class EmailInput extends Vue {
  rules: Rules<string> = [];

  get value() {
    return Module.email;
  }

  mounted() {
    this.rules = require("./rules/email").default;
  }

  update(value: string) {
    Module.setEmail(value);
  }
}
</script>
