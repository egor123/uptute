<template>
  <div id="buttons" :class="{ isVisible: isVisible, isTopBar: isTopBar }">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibilityCounter: 0,
      hideTime: 2000, // ms
    };
  },
  props: {
    isTopBar: Boolean,
  },
  computed: {
    isVisible() {
      return this.visibilityCounter > 0;
    },
  },
  mounted() {
    addEventListener("mousemove", this.onMouseMove);
  },
  methods: {
    onMouseMove() {
      this.visibilityCounter++;
      setTimeout(() => this.visibilityCounter--, this.hideTime);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#buttons {
  flex: 0;
  $padding: 6px;
  @include flexbox(row);
  transition: transform 300ms;
  width: 100%;
  padding-right: $padding;
  padding-left: $padding;

  &.isTopBar {
    padding-top: $padding;
    &:not(.isVisible) {
      transform: translateY(-100%);
    }
  }
  &:not(.isTopBar) {
    padding-bottom: $padding;
    &:not(.isVisible) {
      transform: translateY(100%);
    }
  }
}
</style>
