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
          <raiting :value="tutor.rating" />
          <div>
            <img width="20px" height="20px" src="@/assets/icons/message.svg" />
            <p>{{ tutor.comments }}</p>
          </div>
        </div>

        <v-btn
          outlined
          rounded
          text
          :to="{ nane: 'Tutor', params: { id: tutor.id } }"
          @click="$ga.event('booking', 'button is pressed', 'booking button is pressed', true)"
        >
        
          {{ $l("tutor.btn") }}
        </v-btn>
      </div>

      <calendar class="calendar" :days="tutor.days" />
    </div>
  </div>
</template>

<script>
import Calendar from "./Calendar";
import Raiting from "./Raiting.vue";
export default {
  props: {
    tutors: Array,
  },
  components: { Calendar, Raiting },
};
</script>
<style scoped>
#main {
  width: 100%;
  min-width: 0px;
}
.card {
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  max-width: clamp(260px, 80%, 800px);
  background: var(--v-secondary-base);
  border-radius: 15px;
  margin: 15px auto;
  padding: 15px;
  text-align: left;
}

.data {
  flex: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.calendar {
  flex: 200%;
}

.profile {
  display: inline-flex;
  width: 100%;
}

.profile img {
  margin: auto;
  border-radius: 50%;
  border-style: solid;
  border-width: 2px;
  border-color: var(--v-primary-base);
}

.profile div {
  margin-left: 10px;
  width: 100%;
  padding: 0;
}

.profile .pph {
  float: right;
}

.tutor {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: auto;
}

.tutor div {
  display: flex;
}

.tutor * {
  margin: auto 0;
}

@media (max-width: 720px) {
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
}
</style>