<template>
  <div id="wrapper" ref="wrapper">
    <div class="baseCard" ref="card">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    radius: {
      type: String,
      default: "15px",
    },
  },
  watch: {
    radius: function(val) {
      this.$refs.card.style.borderRadius = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#wrapper {
  z-index: 1;
  position: relative;
  // --radius: 15px;
  min-width: 350px;

  .baseCard {
    height: max-content;
    width: 100%;
    // border-radius: var(--radius);

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
