<template>
  <div class="card">
    <div class="data">
      <div class="profile">
        <img
          @click="goToAboutTutor()"
          class="userImg"
          src="@/assets/icons/user.svg"
        />
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

      <v-btn
        rounded
        elevation="0"
        outlined
        color="accent"
        class="button"
        :to="{ name: 'BookTheLesson' }"
        @click="
          $ga.event(
            'booking',
            'button is pressed',
            'booking button is pressed',
            true
          )
        "
      >
        {{ $l("tutor.btn") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import Rating from "./Rating.vue";

export default {
  components: {
    Rating,
  },
  props: {
    tutor: Object,
    tooltipUse: String,
  },
  methods: {
    goToAboutTutor() {
      if (this.$route.name !== "AboutTutor")
        this.$router.push({ name: "AboutTutor" });
    },
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

.userImg {
  width: 50px;
  height: 50px;
  margin: auto;
  cursor: pointer;

  border-radius: 50%;
  border: 2px solid var(--v-primary-base);
  opacity: 0.2;

  transition: box-shadow 400ms;
  &:hover {
    box-shadow: 1px 2px 5px 2.5px var(--v-primary-lighten4);
  }
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
