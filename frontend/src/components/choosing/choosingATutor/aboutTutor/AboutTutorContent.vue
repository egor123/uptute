<template>
  <div id="content" ref="content">
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
    <div id="commentsDiv" ref="commentsDiv">
      <h4>{{ $l("tutor.comments") }}</h4>
      <Comments
        @input="scrollToComments(500)"
        :id="tutor.uuid"
        background="var(--v-background-base)"
        v-model="commentsSettings"
      />
      <PageSelectionPanel v-model="commentsSettings" :sizes="[2, 5, 10]" />
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
      commentsSettings: { page: 0, itemsPerPage: 5, pagesCount: 0 },
    };
  },
  props: {
    tutor: Object,
    toComments: Boolean,
  },
  // mounted() {
  //   this.$root.$on("dialogOpened", () => {
  //     setTimeout(() => {
  //       this.$refs.content.scrollIntoView();
  //     }, 1);
  //   });
  // },
  methods: {
    scrollToComments(timeout) {
      setTimeout(() => {
        this.$refs.commentsDiv.scrollIntoView({
          behavior: "smooth",
        });
      }, timeout);
    },
  },

  watch: {},
  mounted() {
    this.$root.$on("loadingEnded", () => {
      if (this.toComments) {
        this.$nextTick(() => {
          this.$refs.commentsDiv.scrollIntoView({
            behavior: "smooth",
          });
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
#content {
  $gap: 5rem;
  & > *:not(:first-child):not(:last-child) {
    margin-top: $gap;
  }
  & > *:last-child {
    padding-top: $gap; // for ScrollToComments to have some space above
  }
}
</style>
