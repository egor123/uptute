<template>
  <div id="wrapper">
    <div class="baseCard">
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#wrapper {
  border-radius: inherit;
  z-index: 1;
  position: relative;

  .baseCard {
    height: max-content;
    border-radius: inherit;
    background: var(--v-background-base);

    flex-wrap: wrap;
    padding: 15px;
    text-align: left;
    cursor: default;
    position: relative;

    &::before {
      content: "";
      @include fill-parent();
      position: absolute;
      @include box-shadow;

      z-index: -1;
      border-radius: inherit;
    }

    opacity: 0.4;
    transition: opacity 300ms;
    &:hover {
      opacity: 0.99;
    }
  }
}
</style>
