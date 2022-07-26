<template>
  <TextInput
    v-model="value"
    :rules="rules"
    :label="$l('auth.create')"
    :isPassword="true"
  />
</template>

<script lang="ts">
import TextInput from "../TextInput.vue";
import { Vue, Component } from "vue-property-decorator";
import { Rules } from "../types";

@Component({ components: { TextInput } })
export default class PasswordInput extends Vue {
  rules: Rules<string> = [];

  value: string = "";

  mounted() {
    this.rules = require("./rules/repeatPassword").default;
  }
}
</script>
