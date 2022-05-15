<template>
  <div ref="panel" id="container" class="isLeft">
    <!-- :class="{ isOpened: isOpened }" -->

    <div id="card">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     isOpened: true,
  //   };
  // },
  // computed: {
  //   panel() {
  //     return this.$refs.panel;
  //   },
  // },
  // mounted() {
  //   this.panel.addEventListener("transitionend", this.onTransitionEnd);
  //   setTimeout(() => {
  //     this.isOpened = false;
  //     setTimeout(() => {
  //       this.isOpened = true;
  //     }, 3000);
  //   }, 3000);
  // },
  // beforeDestroy() {
  //   this.panel.removeEventListener("transitionend", this.onTransitionEnd);
  // },
  // methods: {
  //   onTransitionEnd() {
  //     dispatchEvent(new Event("resize"));
  //   },
  // },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#container {
  height: 100vh;
  min-width: 400px;
  max-width: 400px;
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

  // transition: min-width 1s 1s, max-width 1s 1s, transform 1s;
  // &:not(.isOpened) {
  //   min-width: 0px;
  //   max-width: 0px;
  //   // padding: 0px;
  //   transform: translate(-100%);
  // }
}
</style>
