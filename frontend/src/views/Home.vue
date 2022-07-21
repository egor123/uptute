<template>
  <div>
    <div id="hero">
      <HeroCanvas />

      <div id="menuWrapper">
        <Account v-if="!isLoggedIn" />
        <Lesson v-if="isLoggedIn" />
      </div>
    </div>

    <div id="info">
      <Mission />
      <HowItWorks />
      <ForStudent />
      <ForTutor />
    </div>
  </div>
</template>

<script lang="ts">
import HeroCanvas from "@/components/home/HeroCanvas.vue";

import Account from "@/components/home/Account.vue";
import Lesson from "@/components/home/Lesson.vue";

import Mission from "@/components/home/info/Mission.vue";
import HowItWorks from "@/components/home/info/HowItWorks.vue";
import ForStudent from "@/components/home/info/ForStudent.vue";
import ForTutor from "@/components/home/info/ForTutor.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "Home",
  path: "/",
  permisions: {
    roles: "ALL",
    redirect: "Home",
  },
  components: {
    HeroCanvas,

    Account,
    Lesson,

    Mission,
    HowItWorks,
    ForStudent,
    ForTutor,
  },
})
export default class Home extends Vue {
  get isLoggedIn() {
    return this.$store.getters["auth/roles"].length > 0;
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

#hero {
  position: fixed;
  top: 0;
  @include box-size(100%);
  @include flexbox();
  #menuWrapper {
    border-radius: 15px;
    @include box-shadow();
    background-color: #efefefcc;
  }
}
#info {
  margin-top: 100vh;
}
</style>
