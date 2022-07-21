<template>
  <div id="container" ref="container">
    <div id="hero">
      <HeroCanvas class="heroCanvas" />

      <div id="heroWrapper" class="boxShadow">
        <Account
          v-if="roles.length == 0"
          :ifWithIcon="false"
          :color="menu.color"
          :textColor="menu.textColor"
          :borderRadius="menu.borderRadius"
          :border="menu.border"
          :padding="menu.padding"
        />
        <LessonMenu
          v-if="roles.length > 0"
          :ifWithIcon="false"
          :color="menu.color"
          :textColor="menu.textColor"
          :borderRadius="menu.borderRadius"
          :border="menu.border"
          :padding="menu.padding"
        />
      </div>
    </div>

    <div id="innerContainer" ref="innerContainer">
      <SliderLayout
        ref="block0"
        :title="$l('home.mission.title')"
        :elements="sliderLayout.missions"
      />
      <CheckerLayout
        inversed
        ref="block1"
        color="background"
        :title="$l('home.how_it_works.title')"
        :rows="checkerLayout.howItWorks"
      />
      <CheckerLayout
        ref="block2"
        inversed
        color="header"
        :title="$l('why_us.student.title')"
        :rows="checkerLayout.forStudent"
      />
      <CheckerLayout
        ref="block3"
        color="background"
        :title="$l('why_us.tutor.title')"
        :rows="checkerLayout.forTutor"
      />
    </div>
  </div>
</template>

<script>
import SliderLayout from "@/components/global/layouts/sliderLayout/SliderLayout.vue";
import Account from "@/components/header/Account.vue";
import LessonMenu from "@/components/header/LessonMenu.vue";
import CheckerLayout from "@/components/global/layouts/checkerLayout/CheckerLayout.vue";
import HeroCanvas from "@/components/home/HeroCanvas.vue";

import { Mission } from "@/components/global/layouts/sliderLayout/classes/Mission";
import { HowItWorks } from "@/components/global/layouts/checkerLayout/classes/HowItWorks";
import { ForStudent } from "@/components/global/layouts/checkerLayout/classes/ForStudent";
import { ForTutor } from "@/components/global/layouts/checkerLayout/classes/ForTutor";

export default {
  name: "Home",
  path: "/",
  permissons: {
    roles: "ALL",
    redirect: "Home",
  },
  components: {
    SliderLayout,
    CheckerLayout,
    Account,
    LessonMenu,
    HeroCanvas,
  },
  data() {
    return {
      sliderLayout: {
        missions: new Mission(this).arr,
      },
      checkerLayout: {
        howItWorks: new HowItWorks(this).arr,
        forStudent: new ForStudent(this).arr,
        forTutor: new ForTutor(this).arr,
      },
      menu: {
        color: "var(--v-background-base)",
        textColor: "var(--v-secondary-darken3)",
        borderRadius: "15px",
        border: "dashed 2px var(--v-accent-base)",
        padding: "1rem 3rem",
      },
      url: "https://player.vimeo.com/video/20924263?muted=1&autoplay=1&loop=1&sidedock=0&color=ffa500&enablejsapi=1",
      heroFadeTimeout: 300,
    };
  },
  computed: {
    roles: function () {
      return this.$store.getters["auth/roles"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

#container {
  #innerContainer {
    margin-top: 100vh;
  }
}

h1 {
  color: var(--v-primary-base);
}

#hero {
  position: fixed;
  background: var(--v-background-base);
  top: 0;
  width: 100vw;
  height: 100vh;
  @include flexbox();
  #heroWrapper {
    border-radius: 15px;
    // padding: 1rem 3rem;
    @include box-shadow();
    background: #efefefcc;

    // & > * {
    //   padding: 16px;
    //   padding-top: 0;
    //   &:first-child {
    //     padding-top: 16px;
    //   }
    // }

    #moto {
      font-size: 28px;
      letter-spacing: 0.5ch;
    }
  }
}
</style>
