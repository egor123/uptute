<template>
  <div id="mainInfo">
    <p>{{ age }} {{ $l("find.filters.tutor_age.p") }}</p>
    <Rating :value="rating" />
    <div>
      <img src="@/assets/icons/clock.svg" />
      <div>{{ Math.round(hours) }}{{ $l("tutor.hour") }}</div>
      <div>{{ Math.round(pph) }}UC/{{ $l("tutor.hour") }}</div>
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
  * > * {
    margin-top: 1rem;
  }
  & > *:last-child {
    @include flexbox(row);
    img {
      @include box-size(20px);
      opacity: 0.2;
    }
    div {
      opacity: 0.6;
      &:last-child {
        margin-left: 2rem;
      }
    }
  }
}
</style>
