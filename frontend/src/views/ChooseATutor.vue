<template>
  <Background :title="$l('choose_a.tutor.header')">
    <div class="innerContent">
      <Info />

      <Searching />

      <SortBy v-model="filter" />

      <Panels id="panels" :tutors="getTutors()" />
    </div>

    <ExitSnackbar ref="ExitSnackbarRef" />
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";
import Info from "@/components/choosing/choosingATutor/Info.vue";
import Panels from "@/components/choosing/choosingATutor/Panels";
import Searching from "@/components/choosing/Searching.vue";
import SortBy from "@/components/choosing/choosingATutor/SortBy.vue";
import { isJwtExpired } from "@/services/api.service.js";
import ExitSnackbar from "@/components/choosing/choosingATutor/ExitSnackbar.vue";

import StudentLesson from "@/store/modules/lesson/student/module";

export default {
  name: "ChooseATutor",
  permisions: {
    roles: "ROLE_STUDENT",
    allowedOrigins: "FindATutor",
    redirect: "FindATutor",
  },
  components: {
    Background,
    Info,
    Panels,
    Searching,
    SortBy,
    ExitSnackbar,
  },
  data() {
    return {
      tutors: [],
      filter: { name: "rating", dir: "up" },
      ifSnackbar: false,
      closeButton: false,
      backButton: false,
    };
  },
  methods: {
    preventNav(event) {
      event.preventDefault();
      event.returnValue = "";
    },

    getTutors() {
      return StudentLesson.tutors;
    },
  },
  async beforeRouteLeave(to, from, next) {
    const jwt = JSON.parse(sessionStorage.getItem("user")).jwt;

    if (StudentLesson.phase === "idle" || isJwtExpired(jwt)) next();

    const name = await this.$refs.ExitSnackbarRef.getInput();

    switch (name) {
      case "anyway":
        next();
        StudentLesson.deleteLesson();
        break;
      case "cancel":
        next(false);
        break;
      default:
        throw new Error(`\`${name}\` is not a valid snackbar input`);
    }
  },

  mounted() {
    addEventListener("beforeunload", this.preventNav);
  },
  beforeDestroy() {
    removeEventListener("beforeunload", this.preventNav);
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
$inner-content-width: 350px;

.innerContent {
  margin: calc(106px + 3rem) auto 3rem auto;
  width: $inner-content-width;
  #panels {
    margin-bottom: 3rem;
  }
}

@media (max-width: 400px) {
  .innerContent {
    width: 100vh;
    padding: 0 1rem;
  }
}
</style>
