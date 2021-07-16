<template>
  <div id="content">
    <MainInfo
      :age="tutor.age"
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
      <Comments :id="tutor.uuid" v-model="commentsSettings" />
      <PageSelectionPanel v-model="commentsSettings" :sizes="[2,5,10]"/>
    </div>
  </div>
</template>

<script>
import MainInfo from "@/components/choosing/choosingATutor/aboutTutor/MainInfo.vue";
import AboutInfo from "@/components/choosing/choosingATutor/aboutTutor/AboutInfo.vue";
import AdditionalInfo from "@/components/choosing/choosingATutor/aboutTutor/AdditionalInfo.vue";
import Moto from "@/components/choosing/choosingATutor/aboutTutor/Moto.vue";
import Comments from "@/components/choosing/choosingATutor/aboutTutor/Comments.vue";
import PageSelectionPanel from "@/components/navigation/PageSelectionPanel.vue";

export default {
  components: {
    Comments,
    MainInfo,
    AboutInfo,
    AdditionalInfo,
    Moto,
    PageSelectionPanel,
  },
  data() {
    return {
      commentsSettings: { page: 0, itemsPerPage: 2, pagesCount: 0 },
    };
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
