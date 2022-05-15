<template>
  <div
    ref="panel"
    id="container"
    class="isLeft"
    :class="{ isOpened: isOpened }"
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
      isOpened: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isOpened = false;
      setTimeout(() => {
        this.isOpened = true;
      }, 1000);
    }, 1000);
  },
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
  &:not(.isOpened) {
    display: none;
  }
}
</style>
