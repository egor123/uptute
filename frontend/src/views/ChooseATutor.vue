<template>
  <div id="container">
    <Header :title="$l('choose.header')" />

    <div class="content">
      <div class="innerContent">
        <LessonInfo />
        <div class="infoCard">
          <v-container class="innerContainer">
            <h3 class="chooseOne">{{ $l("choose.choose") }}</h3>
          </v-container>
        </div>
        <SearchingForTutors />
        <Panels id="panels" :tutors="tutors" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Panels from "@/components/tutorPanel/Panels";
import SearchingForTutors from "@/components/SearchingForTutors.vue";
import LessonInfo from "@/components/LessonInfo.vue";

export default {
  name: "ChooseATutor",
  path: "/choose_a_tutor",
  permisions: {
    roles: "USER",
    redirect: "LogIn",
  },
  components: {
    Header,
    Panels,
    SearchingForTutors,
    LessonInfo,
  },
  data() {
    return {
      countDown: 60,
      tutors: [
        {
          name: "No Name",
          pph: 5,
          location: "HTG",
          grade: "11b",
          hours: 10,
          rating: 4.5,
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

#container {
  display: flex;
  height: 100%;
}

.content {
  display: flex;
  flex: 100%;
  background-color: var(--v-background-base);
  justify-content: center;
}

.innerContent {
  margin: 7rem 0;
  width: $inner-content-width;
}

.infoCard {
  width: 100%;
  height: max-content;

  background: var(--v-secondary-base);
  flex-wrap: wrap;
  opacity: 0.4;
  transition: opacity 800ms;
  &:hover {
    opacity: 1;
  }
}

@media (max-width: 400px) {
  .innerContent {
    transform: scale(0.9);
    margin: 1.5rem -0.9rem;
  }
}

@media (max-width: 330px) {
  .innerContent {
    transform: scale(0.8);
    margin: -3rem -2rem;
  }
}

@media (max-width: 300px) {
  .innerContent {
    transform: scale(0.7);
    margin: -7.5rem -3.1rem;
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
<style lang="scss"></style>
