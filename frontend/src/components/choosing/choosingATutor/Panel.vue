<template>
  <HiddenButtonCard :tutor="tutor">
    <template v-slot:static>
      <div class="profile">
        <UserImg :tutor="tutor" />

        <div>
          <p class="pph">{{ tutor.pph }} UC/{{ $l("tutor.hour") }}</p>
          <h3>{{ tutor.firstName }} {{ tutor.lastName }}</h3>
          <p>{{ tutor.age }} {{ $l("find.filters.tutor_age.p") }}</p>
        </div>
      </div>
    </template>

    <template v-slot:moving>
      <div class="tutor">
        <div>
          <img
            width="20px"
            height="20px"
            class="mr-1"
            src="@/assets/icons/clock.svg"
          />
          <p>{{ tutor.hours }}{{ $l("tutor.hour") }}</p>
        </div>
        <Rating :value="tutor.rating" />
        <div>
          <img
            width="20px"
            height="20px"
            class="mr-1"
            src="@/assets/icons/message.svg"
          />
          <p>{{ tutor.comments }}</p>
        </div>
      </div>
    </template>
  </HiddenButtonCard>
</template>

<script>
import HiddenButtonCard from "@/components/choosing/HiddenButtonCard.vue";
import Rating from "./Rating.vue";
import UserImg from "@/components/choosing/choosingATutor/UserImg.vue";

export default {
  data() {
    return {
      windowTop: 0,
    };
  },
  components: {
    HiddenButtonCard,
    Rating,
    UserImg,
  },
  props: {
    tutor: Object,
    tooltipUse: String,
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: auto 0;
}

.profile {
  display: inline-flex;
  width: 100%;
  text-align: left;
  div {
    margin-left: 10px;
    width: 100%;
    padding: 0;
  }
  .pph {
    float: right;
  }
  p {
    margin: 0;
  }
}

.tutor {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
  div {
    display: flex;
  }
  * {
    margin: auto 0;
  }
}
</style>
