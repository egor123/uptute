<template>
  <div id="main">
    <div class="card" v-for="tutor in tutors" :key="tutor.id">
      <div class="data">
        <div class="profile">
          <img width="50px" height="50px" src="@/assets/icons/user.svg" />
          <div>
            <p class="pph">{{ tutor.pph }}&euro;/{{ $l("tutor.hour") }}</p>
            <h3>{{ tutor.name }}</h3>
            <p>{{ tutor.location }}, {{ tutor.grade }}</p>
          </div>
        </div>
        <div class="tutor">
          <div>
            <img width="20px" height="20px" src="@/assets/icons/clock.svg" />
            <p>{{ tutor.hours }}h</p>
          </div>
          <Raiting :value="tutor.rating" />
          <div>
            <img width="20px" height="20px" src="@/assets/icons/message.svg" />
            <p>{{ tutor.comments }}</p>
          </div>
        </div>

        <v-btn
          outlined
          rounded
          text
          class="button"
          :to="{ nane: 'Tutor', params: { id: tutor.id } }"
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
  </div>
</template>

<script>
import Raiting from "./Raiting.vue";

export default {
  props: {
    tutors: Array,
  },
  components: { Raiting },
};
</script>

<style lang="scss" scoped>
$button-height: 36px;
$card-rows-margin: 10px;

#main {
  width: 100%;
  min-width: 0px; /* ??? */
}
.card {
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  /* max-width: clamp(260px, 80%, 800px); */
  width: 100%;
  background: var(--v-secondary-base);
  border-radius: 15px;
  margin: 15px auto;
  padding: 15px;
  text-align: left;

  & .button {
    transition-property: height, opacity, margin-top, background-color;
    transition-timing-function: ease-in-out;

    background-color: var(--v-secondary-darken1);
  }

  & .button:hover {
    transition-duration: 200ms;
    background-color: var(--v-secondary-darken2);
  }

  &:not(:hover) .button {
    height: 0px;
    opacity: 0;
    transition-duration: 180ms;
    transition-delay: 100ms, 0ms, 100ms;
    margin-top: -15px; // to hide invisible element
  }

  &:hover * .button {
    height: $button-height;
    opacity: 0.3;
    transition-duration: 300ms;
    transition-delay: 0ms, 180ms, 0ms;
    margin-top: $card-rows-margin;
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

.profile img {
  margin: 0 auto;
  border-radius: 50%;
  border-style: solid;
  border-width: 2px;
  border-color: var(--v-primary-base);
  opacity: 0.2;
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
  margin-top: $card-rows-margin;
}

.tutor div {
  display: flex;
}

.tutor * {
  margin: auto 0;
}

/* @media (max-width: 720px) {
   .card {
    flex-direction: column;
  }
  .card::after {
    content: "";
    display: block;
    width: 100%;
    height: 40px;
  }
  .data .v-btn {
    position: absolute;
    bottom: 15px;
  }
} */
</style>
