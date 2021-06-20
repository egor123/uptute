<template>
  <div class="container">
    <div
      v-for="i in 5"
      :key="i"
      class="star"
      :style="`--value: ${(value - i + 1) * 100}%`"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 2px;
  width: fit-content;
  height: fit-content;
}
.star {
  & + & {
    margin-left: 5px;
  }
  @mixin star-style($symbol, $color) {
    content: $symbol;
    background-image: linear-gradient(
      to right,
      var(--v-accent-base) var(--value),
      $color var(--value)
    );
    font-size: 1.8rem;
    color: transparent;
    background-clip: text;
  }
  &::before {
    position: absolute;
    @include star-style("\2606", gray);
  }
  &::after {
    @include star-style("\2605", white);
  }
}
</style>
