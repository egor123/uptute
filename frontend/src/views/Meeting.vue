<template>
  <div id="container">
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Meeting",
  data() {
    return {
      meetingID: 5839697402,
    };
  },

  //   mounted() {
  //     console.log("Encoded");
  //     console.log("Decoded: ");
  //     let b64 = btoa("Stefan");
  //     console.log(atob(b64));
  //   },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#container {
  @include box-size(100%);
  @include flexbox();
  & > * {
    margin: auto;
    @include flexbox();
  }
}
</style>
