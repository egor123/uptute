<template>
  <Background :title="$l('choose_a.tutor.header')">
    <div id="wraper">
      <Info />

      <Searching />

      <SortBy v-model="filter" />

      <Panels id="panels" :tutors="tutors" />
    </div>
  </Background>
</template>

<script lang="ts">
import Background from "@/components/global/background/Background.vue";
import Info from "@/components/choosing/choosingATutor/Info.vue";
import Panels from "@/components/choosing/choosingATutor/Panels.vue";
import Searching from "@/components/choosing/Searching.vue";
import SortBy from "@/components/choosing/choosingATutor/SortBy.vue";
import { isJwtExpired } from "@/services/api.service";

import StudentLesson from "@/store/modules/lesson/student/module";

import { Vue, Component } from "vue-property-decorator";
import { Route } from "vue-router";

@Component({
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
})
export default class ChooseATutor extends Vue {
  filter = { name: "rating", dir: "up" };

  public get tutors() {
    return StudentLesson.tutors;
  }

  async beforeRouteLeave(to: Route, from: Route, next: Function) {
    const isExpired = await isJwtExpired();
    const isIdle = StudentLesson.phase === "idle";

    if (isIdle || isExpired) return next();

    const bool = await this.$pop.confirm(this.$l("choose_a.tutor.ended"));

    if (!bool) return next(false);

    StudentLesson.deleteLesson();
    next();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
#wraper {
  margin: calc(106px + 3rem) auto 3rem auto;
  width: 350px;
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
