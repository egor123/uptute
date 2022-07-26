<template>
  <div class="wrapper">
    <router-link :to="{ name: routeName }">
      {{ title }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { goTo } from "@/utility/methods.js";

import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class LinkBase extends Vue {
  goTo = goTo;
  @Prop(String) readonly title!: string;
  @Prop(String) readonly routeName!: string;
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
