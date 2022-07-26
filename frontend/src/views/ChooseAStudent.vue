<template>
  <Background :title="$l('choose_a.student.header')">
    <div class="content">
      <Info />

      <Searching />

      <SortBy v-model="filter" />

      <StudentPanels id="panels" v-model="filter" :students="getStudentsArr" />
    </div>
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";

import Info from "@/components/choosing/choosingAStudent/Info.vue";
import Searching from "@/components/choosing/Searching.vue";
import SortBy from "@/components/choosing/choosingAStudent/SortBy.vue";
import StudentPanels from "@/components/choosing/choosingAStudent/studentPanels/StudentPanels.vue";
import TutorLesson from "@/store/modules/lesson/tutor/module";

export default {
  name: "ChooseAStudent",
  // permisions: {
  // roles: "ROLE_TUTOR",
  // redirect: "/setting_up/tutor",
  // },
  components: {
    Background,
    Info,
    Searching,
    SortBy,
    StudentPanels,
  },
  data() {
    return {
      name: "ChooseAStudent",
      filter: { name: "time", dir: "up" },
    };
  },
  computed: {
    // getStudentsArr() {
    //   if (TutorLesson.lessons.offered.length > 0)
    //     return TutorLesson.lessons.offered;
    //   return TutorLesson.lessons.open;
    // },
    getStudentsArr() {
      return [];
    },
  },
  // beforeMount() {
  //   TutorLesson.initSearch();
  // },
  // beforeRouteLeave(to, from, next) {
  //   TutorLesson.clearAll();
  //   next();
  // },
};
</script>

<style lang="scss" scoped>
.content {
  margin: calc(106px + 3rem) auto 3rem auto;
  width: 350px;
}
</style>
