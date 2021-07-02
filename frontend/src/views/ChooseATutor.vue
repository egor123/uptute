<template>
  <Background :title="$l('choose.header')">
    <div class="innerContent">
      <LessonInfo />
      <div class="infoCard">
        <v-container class="innerContainer">
          <h3 class="chooseOne">{{ $l("choose.choose") }}</h3>
        </v-container>
      </div>
      <SearchingForTutors />
      <v-expansion-panels class="panels" flat focusable hover>
        <SortBy class="sortBy" />
      </v-expansion-panels>
      <Panels id="panels" :tutors="tutors" />
    </div>
  </Background>
</template>

<script>
import Background from "@/components/background/Background.vue";
import Panels from "@/components/tutorPanel/Panels";
import SearchingForTutors from "@/components/SearchingForTutors.vue";
import LessonInfo from "@/components/LessonInfo.vue";
import SortBy from "@/components/sidepanel/SortBy.vue";

export default {
  name: "ChooseATutor",
  path: "/choose_a_tutor",
  permisions: {
    roles: "USER",
    redirect: "LogIn",
  },
  components: {
    Background,
    Panels,
    SearchingForTutors,
    LessonInfo,
    SortBy,
  },
  data() {
    return {
      tutors: [
        {
          name: "No Name",
          pph: 5,
          location: "HTG",
          grade: "11b",
          hours: 10,
          rating: 4.5,
          moto: "Sun shines to all of us the same way",
          comments: 11,
          days: [
            {
              times: [
                { start: "8:00", end: "12:30" },
                { start: "14:01", end: "15:30" },
                { start: "15:41", end: "23:00" },
              ],
              date: new Date(),
            },
            {
              times: [
                { start: "8:00", end: "12:30" },
                { start: "15:00", end: "22:00" },
              ],
              date: new Date(new Date().getTime() + 86400000),
            },
            {
              times: [{ start: "15:00", end: "24:00" }],
              date: new Date(new Date().getTime() + 86400000 * 2),
            },
            {
              times: [{ start: "15:00", end: "23:00" }],
              date: new Date(new Date().getTime() + 86400000 * 3),
            },
            {
              times: [{ start: "15:00", end: "23:00" }],
              date: new Date(new Date().getTime() + 86400000 * 4),
            },
            {
              date: new Date(new Date().getTime() + 86400000 * 5),
            },
            {
              times: [{ start: "10:00", end: "20:00" }],
              date: new Date(new Date().getTime() + 86400000 * 6),
            },
          ],
        },
      ],
    };
  },

  async mounted() {
    for (var i = 0; i < 5; i++) {
      this.tutors.push({ ...this.tutors[0] });
    }
    this.tutors.forEach((tutor) => {
      tutor.rating = Math.random() * 3 + 2;
    });
  },
};
</script>

<style lang="scss" scoped>
$inner-content-width: 350px;

.innerContent {
  margin: calc(106px + 3rem) auto 3rem auto;
  width: $inner-content-width;
}

.infoCard {
  width: 100%;
  margin-bottom: 0 !important;
  height: max-content;

  background: var(--v-secondary-base);
  flex-wrap: wrap;
  opacity: 0.4;
  transition: opacity 800ms;
  &:hover {
    opacity: 1;
  }
}

.panels {
  border-radius: 15px;
}

@media (max-width: 400px) {
  .innerContent {
    transform: scale(0.9);
    margin: 5rem -0.9rem;
  }
}

@media (max-width: 330px) {
  .innerContent {
    transform: scale(0.8);
    margin: -0.5rem -2rem;
  }
}

@media (max-width: 300px) {
  .innerContent {
    transform: scale(0.7);
    margin: -6rem -3.1rem;
  }
}

.infoCard {
  border-radius: 15px;
  margin-bottom: 15px;
}

@media (max-width: 1200px) {
  .lessonInfo {
    border-radius: 15px 15px 0 0;
    position: static;
  }
  .infoCard {
    border-radius: 0 0 15px 15px;
  }
}

.innerContainer {
  padding: 15px;
}

.chooseOne {
  font-size: 1rem;
  font-weight: normal;
}

.timeLeft {
  margin: 1rem 0;
}
</style>
