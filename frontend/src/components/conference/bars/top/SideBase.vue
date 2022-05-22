<template>
  <div
    ref="panel"
    id="container"
    :class="{ isLeft: isLeft, isToggled: isToggled }"
    :style="{ '--m': '-' + w + 'px' }"
  >
    <div id="card">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      w: null,
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
  beforeUnmount() {
    this.$refs.panel.removeEventListener("transitionstart", this.startResizing);
    this.$refs.panel.removeEventListener("transitionend", this.endResizing);
    this.$refs.panel.removeEventListener("transitioncancel", this.endResizing);
  },
  methods: {
    setWidth() {
      this.w = this.$refs.panel.offsetWidth;
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
    isToggled() {
      this.setWidth();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#container {
  transition: margin 1s;
  height: 100vh;
  width: fit-content;
  color: var(--v-light-base);
  &.isLeft {
    padding: 12px 6px 12px 12px;
    &:not(.isToggled) {
      margin-left: var(--m);
    }
  }
  &:not(.isLeft) {
    padding: 12px 12px 12px 6px;
    &:not(.isToggled) {
      margin-right: var(--m);
    }
  }

  #card {
    @include box-size(100%);
    background: var(--v-card-base);
    border-radius: 15px;
    padding: 12px;
    overflow: scroll;
  }
}
</style>
