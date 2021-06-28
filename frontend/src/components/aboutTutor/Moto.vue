<template>
  <div>
    <p>{{ moto }}</p>
    <img src="@/assets/icons/right-quotes-symbol.svg" />
  </div>
</template>

<script>
export default {
  props: {
    moto: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
div {
  position: relative;
  height: 5rem;
  text-align: center;
  @include flexbox();
  img {
    position: absolute;
    @include boxSize(50px);
    opacity: 0.1;
    top: 15%;
    left: 20%;
  }
}
</style>