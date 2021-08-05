<template>
  <div class="container" ref="container">
    <div
      v-for="i in 5"
      :key="i"
      class="star"
      :ref="`star${i}`"
      :style="`--value: ${(value - i + 1) * 100}%`"
      @click="choose(i)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: this.valueProp,
    };
  },
  props: {
    valueProp: {
      type: Number,
      default: 0,
    },
    choosable: Boolean,
  },
  mounted() {
    if (this.choosable) {
      this.$refs.container.children.forEach((child) => {
        child.style.cursor = "pointer";
      });
    }
  },
  methods: {
    choose(i) {
      if (this.choosable) {
        this.value = i;
        this.$forceUpdate();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  line-height: 1rem;
  padding: 2px;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex: row;
  margin: 0;
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
    @include star-style("\2605", var(--v-secondary-darken1));
  }
  &::after {
    @include star-style("\2605", white);
  }
}
</style>
