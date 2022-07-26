<template>
  <Background :title="$l('choose_a.student.header')">
    <div class="content">
      <Info />

      <Searching />

      <SortBy v-model="filter" />

      <StudentPanels :students="getStudentsArr" />
    </div>
  </Background>
</template>

<script lang="ts">
import Background from "@/components/global/background/Background.vue";

import Info from "@/components/choosing/choosingAStudent/Info.vue";
import Searching from "@/components/choosing/Searching.vue";
import SortBy from "@/components/choosing/choosingAStudent/SortBy.vue";
import StudentPanels from "@/components/choosing/choosingAStudent/studentPanels/StudentPanels.vue";
import TutorLesson from "@/store/modules/lesson/tutor/module";

import { Vue, Component } from "vue-property-decorator";
import { Filter } from "@/components/choosing/choosingAStudent/type";
import { Lesson } from "@/store/modules/lesson/tutor/types";
import { Route } from "vue-router";

@Component({
  name: "ChooseAStudent",
  permisions: {
    roles: "ROLE_TUTOR",
    redirect: "/setting_up/tutor",
  },
  components: {
    Background,
    Info,
    Searching,
    SortBy,
    StudentPanels,
  },
})
export default class ChooseAStudent extends Vue {
  filter: Filter = { name: "time", dir: "up" };

  get getStudentsArr(): Lesson[] {
    const lessons = TutorLesson.lessons;
    return lessons.offered.length > 0 ? lessons.offered : lessons.open;
  }

  beforeMount() {
    TutorLesson.initSearch();
  }
  beforeRouteLeave(to: Route, from: Route, next: Function) {
    TutorLesson.clearAll();
    next();
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: calc(106px + 3rem) auto 3rem auto;
  width: 350px;
}
</style>
