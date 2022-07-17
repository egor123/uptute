<template>
  <div id="title">
    <button>
      <img src="@/assets/logo.svg" id="logo" @click="goTo('Home')" />
    </button>
    <button @click="goTo('Home')">
      <h1 id="name">UpTute</h1>
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class component_name extends Vue {}
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

#title {
  @include flexbox();
  text-transform: none;
  color: var(--v-background-base);
  margin-right: auto;

  #logo {
    height: 70px;
  }
  #name {
    font-size: 32px;
    color: var(--v-secondary-base);
  }
  * {
    @include hoverOpacity();
  }
}
</style>
