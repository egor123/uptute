<template>
  <div id="container">
    <Header :title="$l('choose.header')" />

    <div class="content">
      <div class="innerContent">
        <div class="lessonInfo">
          <div class="containerInfo">
            <table>
              <tr>
                <th>{{ $l("find.filters.subject.h") }}</th>
                <td>Maths</td>
              </tr>
              <tr>
                <th>{{ $l("find.filters.language.h") }}</th>
                <td>English, Esonian</td>
              </tr>
              <tr>
                <th>{{ $l("find.filters.price.h") }}</th>
                <td>3.00 - 6.00 $/h</td>
              </tr>
              <tr>
                <th>{{ $l("find.filters.day.h") }}</th>
                <td>Monday, 06.21.2021</td>
              </tr>
              <tr>
                <th>{{ $l("find.filters.time.h") }}</th>
                <td>12.00 - 14.00</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="infoCard">
          <v-container class="innerContainer">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <p class="timeLeft" v-bind="attrs" v-on="on">
                  00:{{ countDown }}
                </p>
              </template>
              <span>
                <p>
                  {{ $l("choose.time_left") }}
                </p>
              </span>
            </v-tooltip>

            <h3 class="chooseOne">{{ $l("choose.choose") }}</h3>
          </v-container>
        </div>
        <Panels id="panels" :tutors="tutors" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Panels from "@/components/tutorPanel/Panels";

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
  methods: {
    async countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
  },

  async mounted() {
    for (var i = 0; i < 5; i++) {
      this.tutors.push({ ...this.tutors[0] });
    }
    this.tutors.forEach((tutor) => {
      tutor.rating = Math.random() * 3 + 2;
    });
    this.countDownTimer();
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
  margin: 15vh 0;
  width: $inner-content-width;
}

@media (max-width: 400px) {
  .innerContent {
    width: 300px;
  }
}

.infoCard,
.lessonInfo {
  width: 100%;
  height: max-content;

  background: white;
  flex-wrap: wrap;
  opacity: 0.4;
  transition: opacity 800ms;
  &:hover {
    opacity: 1;
  }
}

.lessonInfo {
  border-radius: 15px 15px 0 0;
  margin-bottom: 8px;
}

.infoCard {
  border-radius: 0 0 15px 15px;
  margin-bottom: 3vh;
}

.lessonInfo {
  width: 100%;
  & .containerInfo {
    padding: 15px;
    text-align: left;
    width: 100%;
  }
  & table {
    width: 100%;
  }
  & td,
  th {
    padding-bottom: 10px;
    margin: 0;
    &:last-child {
      padding: 0px;
    }
  }

  & th {
    color: var(--v-secondary-darken2);
    font-weight: normal;
  }

  & td {
    text-align: right;
  }
}

@media (min-width: 1250px) {
  .lessonInfo {
    position: fixed;
    right: 3vw;
    top: 15vh;
    width: $inner-content-width;
  }

  .lessonInfo,
  .infoCard {
    border-radius: 15px;
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
