<template>
  <div id="content">
    <MainInfo
      :location="tutor.location"
      :grade="tutor.grade"
      :rating="tutor.rating"
      :hours="tutor.hours"
      :pph="tutor.pph"
    />
    <Moto :moto="tutor.moto" />
    <AboutInfo :about="tutor.about" />
    <AdditionalInfo
      :subjects="tutor.subjects"
      :languages="tutor.languages"
      :audience="tutor.audience"
      :age="tutor.age"
    />
    <div>
      <h4>{{ $l("tutor.comments") }}</h4>
      <Comments />
    </div>
  </div>
</template>

<script>
import MainInfo from "@/components/aboutTutor/MainInfo.vue";
import AboutInfo from "@/components/aboutTutor/AboutInfo.vue";
import AdditionalInfo from "@/components/aboutTutor/AdditionalInfo.vue";
import Moto from "@/components/aboutTutor/Moto.vue";
import Comments from "@/components/Comments.vue";

export default {
  components: {
    Comments,
    MainInfo,
    AboutInfo,
    AdditionalInfo,
    Moto,
  },
  props: {
    tutor: Object,
  },
  mounted() {
    console.log(this.tutor);
  },
};
</script>

<style lang="scss" scoped>
#content {
  & > *:not(:first-child) {
    margin-top: 5rem;
  }
}
</style>
