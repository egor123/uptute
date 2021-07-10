<template>
  <Background :title="$l('choose_a.student.header')">
    <div class="innerContent">
      <InfoCardBase class="price">
        <h3>{{ $l("choose_a.student.price") }}</h3>
        <h3>65 UC</h3>
      </InfoCardBase>
      <Searching />
      <StudentPanels id="panels" :students="students" />
    </div>
  </Background>
</template>

<script>
import Background from "@/components/background/Background.vue";
import InfoCardBase from "@/components/choosing/infoCards/InfoCardBase.vue";
import Searching from "@/components/choosing/Searching.vue";
import StudentPanels from "@/components/choosing/choosingAStudent/StudentPanels.vue";

export default {
  components: {
    Background,
    InfoCardBase,
    Searching,
    StudentPanels,
  },
  data() {
    return {
      students: [
        {
          name: "NoName",
          date: "07. 09. 2021",
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
    };
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

h3 {
  font-size: 1rem;
  font-weight: normal;
}

.price {
  display: flex;
  *:last-child {
    margin-left: auto;
  }
}
</style>
