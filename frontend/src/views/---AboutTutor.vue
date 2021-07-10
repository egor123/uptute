<template>
  <Background>
    <template v-slot:subheader>
      <div id="subheader">
        <img @click="goToAboutTutor()" src="@/assets/icons/user.svg" />
        <h3>{{ tutor.name }}</h3>
      </div>
    </template>

    <BackgroundCard>
      <SideButtonBase
        :sideButtons="[
          {
            name: 'mdi-credit-card-outline',
            path: $l('tutor.btn'),
          },
        ]"
        :to="{ name: 'BookTheLesson' }"
      />

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
    </BackgroundCard>
  </Background>
</template>

<script>
import Background from "@/components/background/Background.vue";
import BackgroundCard from "@/components/background/BackgroundCard.vue";

import SideButtonBase from "@/components/sideButtons/SideButtonBase.vue";
import MainInfo from "@/components/tutorPanel/aboutTutor/MainInfo.vue";
import AboutInfo from "@/components/tutorPanel/aboutTutor/AboutInfo.vue";
import AdditionalInfo from "@/components/tutorPanel/aboutTutor/AdditionalInfo.vue";
import Moto from "@/components/tutorPanel/aboutTutor/Moto.vue";
import Comments from "@/components/Comments.vue";

export default {
  name: "AboutTutor",
  path: "/about_the_tutor",
  permisions: {
    roles: "ALL",
  },
  components: {
    Background,
    BackgroundCard,
    Comments,
    SideButtonBase,
    MainInfo,
    AboutInfo,
    AdditionalInfo,
    Moto,
  },
  data() {
    return {
      windowTop: 0,
      tutor: {
        name: "No Name",
        pph: 5,
        location: "HTG",
        grade: "11b",
        hours: 10,
        rating: 4.5,
        comments: 11,
        subjects: ["math", "chem", "biol"],
        languages: ["est", "ru", "en"],
        audience: [1, 10],
        age: 17,
        moto: "Sun shines to all of us the same way",
        about:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus nostrum a debitis aliquam quasi, accusamus accusantium iure odio molestiasunde, autem harum placeat ad? Odio vel fugit porro doloribus doloremque?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, magnam.",
      },
    };
  },

  async mounted() {
    this.tutor.rating = Math.random() * 3 + 2;
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#subheader {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    @include box-size(40px);
    border-radius: 50%;
    border: 2px solid var(--v-primary-base);
    opacity: 0.2;
    margin-right: 1rem;
  }
}

::v-deep #backgroundCard {
  max-width: 50rem !important;
}

#content {
  & > *:not(:first-child) {
    margin-top: 5rem;
  }
}
</style>
