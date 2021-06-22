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
            <img
              width="20px"
              height="20px"
              class="mr-1"
              src="@/assets/icons/clock.svg"
            />
            <p>{{ tutor.hours }}{{ $l("tutor.hour") }}</p>
          </div>
          <Raiting :value="tutor.rating" />
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
$card-rows-margin: 5px;

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

  & .tutor {
    margin: 36px 0 -36px 0;
  }

  & .button {
    opacity: 0;
    color: var(--v-secondary-darken3);
    background: var(--v-secondary-darken4);
    &:hover {
      opacity: 1 !important;
    }
  }

  &:not(:hover) {
    & .tutor {
      transition: all 500ms ease 200ms;
    }
    & .button {
      transition: opacity 500ms ease 0ms;
    }
  }

  &:hover {
    & .tutor {
      margin: 0 !important;
      transition: all 600ms ease 0ms;
    }
    & .button {
      opacity: 0.6;
      transition: opacity 800ms ease 100ms;
    }
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
  margin-top: 30px;
}

.tutor div {
  display: flex;
}

.tutor * {
  margin: auto 0;
}
</style>
