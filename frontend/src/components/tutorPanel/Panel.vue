<template>
  <div class="card">
    <div class="data">
      <div class="profile">
        <UserImg :tutor="tutor" />

        <div>
          <p class="pph">{{ tutor.pph }}&euro;/{{ $l("tutor.hour") }}</p>
          <h3>{{ tutor.name }}</h3>
          <p>{{ tutor.location }}, {{ tutor.grade }}</p>
        </div>
      </div>

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

      <BookButton :tutor="tutor" />
    </div>
  </div>
</template>

<script>
import Rating from "./Rating.vue";
import UserImg from "@/components/dialogs/UserImg.vue";
import BookButton from "@/components/dialogs/BookButton.vue";

export default {
  data() {
    return {
      windowTop: 0,
    };
  },
  components: {
    Rating,
    UserImg,
    BookButton,
  },
  props: {
    tutor: Object,
    tooltipUse: String,
  },
};
</script>

<style lang="scss" scoped>
.card {
  cursor: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: left;
}

.data {
  flex: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.profile {
  display: inline-flex;
  width: 100%;
}

.profile div {
  margin-left: 10px;
  width: 100%;
  padding: 0;
}

.profile .pph {
  float: right;
}

.profile p {
  margin: 0;
}

.tutor {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
}

.tutor div {
  display: flex;
}

.tutor * {
  margin: auto 0;
}
</style>
