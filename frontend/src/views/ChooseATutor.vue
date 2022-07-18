<template>
  <Background :title="$l('choose_a.tutor.header')">
    <div id="wraper">
      <Info />

      <Searching />

      <SortBy v-model="filter" />

      <Panels id="panels" :tutors="getTutors()" />
    </div>
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";
import Info from "@/components/choosing/choosingATutor/Info.vue";
import Panels from "@/components/choosing/choosingATutor/Panels";
import Searching from "@/components/choosing/Searching.vue";
import SortBy from "@/components/choosing/choosingATutor/SortBy.vue";
import { isJwtExpired } from "@/services/api.service.js";

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

    const bool = await this.$pop.confirm(this.$l("choose_a.tutor.ended"));

    if (bool) {
      next();
      StudentLesson.deleteLesson();
    } else next(false);
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

#wraper {
  margin: calc(106px + 3rem) auto 3rem auto;
  width: $inner-content-width;
  #panels {
    margin-bottom: 3rem;
  }
}

@media (max-width: 400px) {
  #wraper {
    width: 100vh;
    padding: 0 1rem;
  }
}
</style>
