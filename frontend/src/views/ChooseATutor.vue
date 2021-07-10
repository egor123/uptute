<template>
  <Background :title="$l('choose_a.tutor.header')">
    <div class="innerContent">
      <LessonInfo class="lessonInfo" />
      <div class="infoCard">
        <InfoCardBase>
          <h3 class="chooseOne">{{ $l("choose_a.tutor.choose") }}</h3>
        </InfoCardBase>
      </div>
      <Searching />
      <v-expansion-panels class="panels" flat focusable hover>
        <SortBy class="sortBy" />
      </v-expansion-panels>
      <Panels id="panels" :tutors="tutors" />
    </div>
    <v-snackbar max-width="800" color="error" timeout="-1" v-model="showAlert">
      {{ $l("choose_a.tutor.ended") }}
      <div id="snackButtons">
        <v-btn text v-model="closeButton" ref="closeBtn">
          {{ $l("choose_a.tutor.anyway") }}
        </v-btn>
        <v-btn text v-model="backButton" ref="backBtn">
          {{ $l("choose_a.tutor.cancel") }}
        </v-btn>
      </div>
    </v-snackbar>
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";
import InfoCardBase from "@/components/choosing/infoCards/InfoCardBase.vue";
import Panels from "@/components/choosing/choosingATutor/Panels";
import Searching from "@/components/choosing/Searching.vue";
import LessonInfo from "@/components/choosing/infoCards/LessonInfo.vue";
import SortBy from "@/components/filterPanel/SortBy.vue";

export default {
  permisions: {
    roles: "USER",
    allowedOrigins: "FindATutor",
    redirect: "FindATutor",
  },
  components: {
    Background,
    InfoCardBase,
    Panels,
    Searching,
    LessonInfo,
    SortBy,
  },
  data() {
    return {
      showAlert: false,
      closeButton: false,
      backButton: false,
      tutors: [
        {
          name: "No Name",
          pph: 5,
          location: "HTG",
          grade: "11b",
          hours: 10,
          rating: 4.5,
          comments: 11,
          subjects: ["math", "chem", "biol"],
          languages: ["est", "ru", "en"],
          audience: [1, 10],
          age: 17,
          moto: "Sun shines to all of us the same way",
          about:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris semper varius nibh, quis ornare massa sollicitudin at. Aenean ut dictum purus. Fusce faucibus elit at nisi pellentesque aliquet. Nunc rhoncus malesuada ullamcorper. Mauris sodales libero eget varius tincidunt. Pellentesque quis euismod nisl, et suscipit felis. Donec mollis, mi et efficitur dictum, nisi ligula vulputate nibh, sit amet dignissim ante lorem efficitur sem. Sed tincidunt convallis erat, eu blandit tellus semper id. Sed quis sodales orci, quis tempus justo. Nam porta auctor dictum. Maecenas varius nec turpis imperdiet accumsan.",
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
    preventNav(event) {
      console.log(event);
      event.preventDefault();
      event.returnValue = "";
    },
    untilClick() {
      return new Promise((res) => {
        const backBtn = this.$refs.backBtn.$el;
        const closeBtn = this.$refs.closeBtn.$el;
        backBtn.onclick = () => {
          res("back");
        };
        closeBtn.onclick = () => {
          res("close");
        };
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    this.showAlert = true;
    // if (!window.confirm("Leave without saving?")) {
    //   return;
    // }

    this.untilClick().then((val) => {
      console.log(val);
      this.showAlert = false;
      if (val === "close") next();
    });
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
  },
  mounted() {
    window.addEventListener("beforeunload", this.preventNav);

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
@import "@/scss/mixins.scss";
$inner-content-width: 350px;

::v-deep .v-snack__wrapper {
  border-radius: 15px !important;
  .v-snack__content {
    @include flexbox(column);
  }
  #snackButtons .v-btn {
    border-radius: 15px !important;
    margin: 0.5rem 0.5rem 0 0.5rem;
  }
}

.innerContent {
  margin: calc(106px + 3rem) auto 3rem auto;
  width: $inner-content-width;
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
::v-deep {
  @media (max-width: 1200px) {
    .lessonInfo {
      &.baseCard {
        border-radius: 15px 15px 0 0;
        position: static;
      }

      position: static;
    }
    .infoCard {
      .baseCard {
        border-radius: 0 0 15px 15px;
      }
    }
  }
}

.chooseOne {
  font-size: 1rem;
  font-weight: normal;
}

.timeLeft {
  margin: 1rem 0;
}
</style>
