<template>
  <Background :title="$l('choose_a.student.header')">
    <div class="innerContent">
      <InfoCardBase class="price">
        <h3>{{ $l("choose_a.student.price") }}</h3>
        <h3>65 UC</h3>
      </InfoCardBase>
      <Searching />
      <SortBy :filters="filters" />
      <StudentPanels id="panels" :students="students" />
    </div>
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";
import InfoCardBase from "@/components/choosing/infoCards/InfoCardBase.vue";
import Searching from "@/components/choosing/Searching.vue";
import SortBy from "@/components/filterPanel/ExpandableSortBy.vue";
import StudentPanels from "@/components/choosing/choosingAStudent/StudentPanels.vue";

export default {
  components: {
    Background,
    InfoCardBase,
    Searching,
    SortBy,
    StudentPanels,
  },
  data() {
    return {
      filters: [
        //TO DO!!!!!!!!!
        { name: "time", dir: "up" },
        { name: "subject", dir: "up" },
        { name: "grade", dir: "up" },
      ],
      students: [
        {
          name: "NoName",
          date: { date: "mkm" },
          time: {
            start: "16.00",
            end: "17.30",
          },
          grade: 11,
          subject: "Maths",
          topic: {
            title: "Logarithms",
            text: "Woud like to revise the basics before the test.",
          },
        },
      ],
      weekdays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      months: [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sept",
        "oct",
        "nov",
        "dec",
      ],
    };
  },
  methods: {
    settingDate() {
      var date = new Date();
      this.students[0].date = {
        weekday: this.weekdays[date.getDay()],
        day: date.getDate(),
        month: this.months[date.getMonth()],
        year: date.getFullYear(),
      };
    },
  },
  beforeMount() {
    this.settingDate();
    // console.log(this.date);
  },
  mounted() {
    for (var i = 0; i < 5; i++) {
      this.students.push(this.students[0]);
    }
  },
};
</script>

<style lang="scss" scoped>
$inner-content-width: 350px;

.innerContent {
  margin: calc(106px + 3rem) auto 3rem auto;
  width: $inner-content-width;
}

.price {
  display: flex;
  color: var(--v-primary-lighten4);
  *:last-child {
    margin-left: auto;
  }
}
</style>
