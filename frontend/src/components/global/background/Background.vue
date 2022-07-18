<template>
  <div id="containerMain">
    <!-- <Subheader :title="title"><slot name="subheader" /> </Subheader> -->
    <slot />
  </div>
</template>

<script>
// import Subheader from "@/components/app/Subheader.vue";
export default {
  //   components: {
  //     Subheader,
  //   },
  //   props: {
  //     title: String(),
  //   },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#containerMain {
  @include flexbox;
  @include box-size(100%);
  background-color: var(--v-background-base);
}
</style>
