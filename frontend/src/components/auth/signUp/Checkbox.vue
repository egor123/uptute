<template>
  <div class="checkbox">
    <v-checkbox v-model="ifTicked" :rules="rules" required />
    <p>
      {{ $l("auth.privacy", { terms: "", privacy: "test" }) }}
      <router-link :to="{ name: 'PrivacyPolicy' }">
        {{ $l("app.pages.privacy_policy") }}
      </router-link>
      ,
      <router-link :to="{ name: 'TermsOfUse' }">
        {{ $l("app.pages.terms") }}
      </router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Rules } from "../types";

@Component
export default class RegisterCheckbox extends Vue {
  rules: Rules<string> = [];

  ifTicked: boolean = false;

  mounted() {
    this.rules = require("./rules/checkbox").default;
  }
}
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  margin-bottom: 1rem;
  opacity: 0.5;
}
.checkbox p {
  position: absolute;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  text-align: left;
}
</style>
