<template>
  <div id="backgroundCard">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#backgroundCard {
  @include flexbox(column);
  position: relative;
  margin: calc(106px + 6rem) 1rem 6rem 1rem;
  padding: 4rem;
  border-radius: 15px;
  background: #eaeaea !important;
  max-width: 40rem;
  width: 100vw;
  min-width: 250px;
}
</style>
