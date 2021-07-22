<template>
  <div>
    <div class="bubble" v-for="(bubble, index) in 5" :key="index" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.bubble {
  @include box-size(40px);
  background: royalblue;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
