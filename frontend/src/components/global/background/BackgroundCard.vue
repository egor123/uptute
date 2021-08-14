<template>
  <div id="backgroundCard" :style="getStyles()">
    <slot />
  </div>
</template>

<script>
export default {
  props: ["topOffset"],
  methods: {
    getStyles() {
      if (this.topOffset) return `--topOffset: ${this.topOffset}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#backgroundCard {
  --topOffset: calc(106px + 6rem);

  @include flexbox(column);
  position: relative;
  margin: var(--topOffset) 1rem 6rem 1rem;
  padding: 4rem;
  border-radius: 15px;
  background: transparent !important;
  max-width: 40rem;
  width: 100vw;
  min-width: 250px;
}
</style>
