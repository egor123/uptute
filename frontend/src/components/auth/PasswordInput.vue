<template>
  <TextInput
    :value="value"
    @input="update"
    :rules="rules"
    :label="$l('auth.create')"
    :isPassword="true"
    :hasProgressBar="true"
  />
</template>

<script lang="ts">
import TextInput from "./TextInput.vue";
import { Vue, Component } from "vue-property-decorator";
import Module from "@/store/modules/auth/credentials";
import { Rules } from "./types";

@Component({ components: { TextInput } })
export default class PasswordInput extends Vue {
  rules: Rules<string> = [];

  get value() {
    return Module.password;
  }

  mounted() {
    this.rules = require("./rules/password").default;
  }

  update(value: string) {
    Module.setPassword(value);
  }
}
</script>
