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
      <Panels id="panels" :tutors="$store.getters.getTutors" />
    </div>
    <v-snackbar max-width="800" color="error" timeout="-1" v-model="showAlert">
      Sarch session will be ended!
      <div id="snackButtons">
        <v-btn text v-model="closeButton" ref="closeBtn"> Close anyway </v-btn>
        <v-btn text v-model="backButton" ref="backBtn"> Back </v-btn>
      </div>
    </v-snackbar>
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
    allowedOrigins: "FindATutor",
    redirect: "FindATutor",
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
      showAlert: false,
      closeButton: false,
      backButton: false,
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
        backBtn.onclick = () => res("back");
        closeBtn.onclick = () => res("close");
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    this.showAlert = true;
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
    this.$store.dispatch("startSearch", null);
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
