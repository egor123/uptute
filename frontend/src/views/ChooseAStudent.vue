<template>
  <Background :title="$l('choose_a.student.header')">
    <div class="content">
      <InfoCardBase class="price" radius="15px">
        <h3>{{ $l("choose_a.student.price") }}</h3>
        <h3>65 UC</h3>
      </InfoCardBase>
      
      <Searching />

      <SortBy
        id="sortBy"
        v-model="filter"
        :filters="filters"
        :label="$l('find.filters.filters.h')"
        :flat="false"
        :text="`${$l('find.filters.filters.' + filter.name)} ${
          filter.dir === 'up' ? '↑' : '↓'
        }`"
        :convertor="(item) => $l('find.filters.filters.' + item.name)"
      />

      <StudentPanels id="panels" :students="getStudentsArr" />
    </div>
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";

import InfoCardBase from "@/components/choosing/infoCards/InfoCardBase.vue";
import Searching from "@/components/choosing/Searching.vue";
import SortBy from "@/components/filterPanel/ExpandableSortBy.vue";
import StudentPanels from "@/components/choosing/choosingAStudent/studentPanels/StudentPanels.vue";
import TutorLesson from "@/store/modules/lesson/tutor/module";

export default {
  name: "ChooseAStudent",
  permisions: {
    roles: "ROLE_TUTOR",
    redirect: "/setting_up/tutor",
  },
  components: {
    Background,

    InfoCardBase,
    Searching,
    SortBy,
    StudentPanels,
  },
  data() {
    return {
      name: "ChooseAStudent",
      filter: { name: "time", dir: "up" },
      filters: [
        { name: "time", dir: "up" },
        { name: "subject", dir: "up" },
        { name: "grade", dir: "up" },
      ],
    };
  },
  computed: {
    getStudentsArr() {
      if (TutorLesson.lessons.offered.length > 0)
        return TutorLesson.lessons.offered;
      return TutorLesson.lessons.open;
    },
  },
  beforeMount() {
    TutorLesson.initSearch();
  },
  beforeRouteLeave(to, from, next) {
    TutorLesson.clearAll();
    next();
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin: calc(106px + 3rem) auto 3rem auto;
  width: 350px;
  .price {
    color: var(--v-primary-lighten4);
    border-radius: 15px;
    // overflow: hidden;
    * {
      display: inline;
      margin: 0;
    }
    & *:last-child {
      float: right;
    }
  }
  #sortBy {
    border-radius: 15px;
  }
}
</style>
