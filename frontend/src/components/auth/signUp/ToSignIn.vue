<template>
  <div class="wrapper">
    <router-link :to="{ name: 'LogIn' }">
      {{ $l("auth.account_already") }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { goTo } from "@/utility/methods.js";

import { Vue, Component } from "vue-property-decorator";

@Component
export default class ToSignIn extends Vue {
  goTo = goTo;
}
</script>

<style scoped lang="scss">
.wrapper {
  width: fit-content;
  a {
    font-size: 87.5%;
    opacity: 0.5;
    text-decoration: none;
  }
}
</style>
