<template>
  <div ref="buttons" id="buttons" :class="{ isTopBar: isTopBar }">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibilityCounter: 0,
      hideTime: 2000, // ms
      transitionIds: [],
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
    this.$refs.buttons.addEventListener("transitionstart", this.startResizing);
    this.$refs.buttons.addEventListener("transitionend", this.endResizing);
    this.$refs.buttons.addEventListener("transitioncancel", this.endResizing);
  },
  beforeDestroy() {
    removeEventListener("mousemove", this.onMouseMove);
    this.$refs.buttons.removeEventListener(
      "transitionstart",
      this.startResizing
    );
    this.$refs.buttons.removeEventListener("transitionend", this.endResizing);
    this.$refs.buttons.removeEventListener(
      "transitioncancel",
      this.endResizing
    );
  },
  methods: {
    onMouseMove() {
      this.visibilityCounter++;
      setTimeout(() => this.visibilityCounter--, this.hideTime);
    },
    startResizing() {
      const id = setInterval(() => {
        dispatchEvent(new Event("resize"));
      }, 0);
      this.transitionIds.push(id);
    },
    endResizing() {
      clearInterval(this.transitionIds[0]);
      this.transitionIds.shift();
    },
  },
  watch: {
    isVisible(isVisible) {
      const style = this.$refs.buttons.style;
      const h = this.$refs.buttons.offsetHeight;
      const side = this.isTopBar ? "Top" : "Bottom";
      const m = isVisible ? `0px` : `-${h}px`;

      style[`margin${side}`] = m;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#buttons {
  transition: margin 1s;
  flex: 0;
  $padding: 6px;
  @include flexbox(row);
  width: 100%;
  padding-right: $padding;
  padding-left: $padding;

  &.isTopBar {
    padding-top: $padding;
  }
  &:not(.isTopBar) {
    padding-bottom: $padding;
  }
}
</style>
