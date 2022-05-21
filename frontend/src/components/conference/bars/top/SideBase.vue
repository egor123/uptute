<template>
  <div ref="panel" id="container" :class="{ isLeft: isLeft }">
    <div id="card">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionIds: [],
    };
  },
  props: {
    isToggled: Boolean,
    isLeft: Boolean,
  },
  mounted() {
    this.$refs.panel.addEventListener("transitionstart", this.startResizing);
    this.$refs.panel.addEventListener("transitionend", this.endResizing);
    this.$refs.panel.addEventListener("transitioncancel", this.endResizing);
  },
  beforeDestroy() {
    this.$refs.panel.removeEventListener("transitionstart", this.startResizing);
    this.$refs.panel.removeEventListener("transitionend", this.endResizing);
    this.$refs.panel.removeEventListener("transitioncancel", this.endResizing);
  },
  methods: {
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
    isToggled(isToggled) {
      const style = this.$refs.panel.style;
      const w = this.$refs.panel.offsetWidth;
      const side = this.isLeft ? "Left" : "Right";
      const m = isToggled ? `0px` : `-${w}px`;

      style[`margin${side}`] = m;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#container {
  transition: margin 1s;
  height: 100vh;
  // width: 400px;
  width: fit-content;
  color: var(--v-light-base);
  &.isLeft {
    padding: 12px 6px 12px 12px;
  }
  &:not(.isLeft) {
    padding: 12px 12px 12px 6px;
  }
  #card {
    @include box-size(100%);
    background: var(--v-card-base);
    border-radius: 15px;
    padding: 6px;
    overflow: scroll;
  }
}
</style>
