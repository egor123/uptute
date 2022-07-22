<template>
  <div id="mainInfo">
    <!-- <p>{{ age }} {{ $l("find.filters.tutor_age.p") }}</p> -->
    <div>
      <div>{{ Math.round(pph) }}UC/{{ $l("tutor.hour") }}</div>
    </div>
    <Rating :valueProp="rating" />
    <div>
      <img src="@/assets/icons/clock.svg" />
      <div>{{ Math.round(hours) }}{{ $l("tutor.hour") }}</div>
    </div>
  </div>
</template>

<script>
import Rating from "@/components/choosing/choosingATutor/Rating.vue";

export default {
  props: {
    location: String,
    age: Number,
    rating: Number,
    hours: Number,
    pph: Number,
  },
  components: {
    Rating,
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";
#mainInfo {
  @include flexbox(column);
  & > *:not(:first-child) {
    margin-top: 1rem;
  }
  & > *:last-child {
    @include flexbox(row);
    img {
      @include box-size(20px);
      opacity: 0.4;
      margin: auto 4px auto 0;
    }
    div {
      text-align: center;
      // &:last-child {
      //   margin-left: 2rem;
      // }
    }
  }
}
</style>
