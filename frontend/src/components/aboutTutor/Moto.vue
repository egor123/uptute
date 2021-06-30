<template>
  <div id="moto">
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
p {
  margin: 0;
  margin-bottom: auto;
}

#moto {
  position: relative;
  height: content;
  text-align: center;
  @include flexbox();
  img {
    position: absolute;
    @include box-size(50px);
    opacity: 0.1;
    top: -30%;
    left: 12%;
  }
}
</style>
