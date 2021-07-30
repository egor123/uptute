<template>
  <div class="baseCard">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.baseCard {
  height: max-content;
  border-radius: 15px;

  flex-wrap: wrap;
  padding: 15px;
  text-align: left;
  cursor: default;
  position: relative;

  &::before {
    content: "";
    @include fill-parent();

    @include box-shadow;
    border-radius: inherit;
  }

  opacity: 0.4;
  transition: opacity 300ms;
  &:hover {
    opacity: 1;
  }
}
</style>
