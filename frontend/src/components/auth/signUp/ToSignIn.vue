<template>
  <div>
    <router-link class="link" :to="{ name: 'LogIn' }">
      {{ $l("auth.account_already") }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { goTo } from "@/utility/methods.js";

import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";

@Component
export default class ToSignIn extends Vue {
  goTo = goTo;
}
</script>

<style scoped lang="scss">
a.link {
  font-size: 87.5%;
  opacity: 0.5;
}
</style>
