<template>
  <div id="containerMain">
    <Header :title="$l('find.header')" />

    <div id="contentMain">
      <div class="innerContent">
        <Sidepanel id="sidepanel" />
        <v-btn @click="emitSearchCheck()" rounded class="orangeBackground mt-3">
          {{ $l("find.request") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Sidepanel from "@/components/sidepanel/Sidepanel.vue";
import { bus } from "@/main.js";

export default {
  name: "FindATutor",
  path: "/find_a_tutor",
  permisions: {
    roles: "USER",
    redirect: "LogIn",
  },
  data() {
    return {
      search: {
        subjects: "",
        language: [],
      },
      checkedValues: [],
    };
  },
  methods: {
    emitSearchCheck() {
      bus.$emit("searchCheck");
    },
  },
  components: {
    Header,
    Sidepanel,
  },
  created() {
    bus.$on("searchCheckFeedback", (checkValue) => {
      let checkedValue = checkValue.length != 0;
      this.checkedValues.push(checkedValue);
      console.log(this.checkedValues);
      if (this.checkedValues.length === 2) {
        if (!this.checkedValues.includes(false)) {
          this.$router.push({ name: "ChooseATutor" });
        }
        this.checkedValues = [];
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.innerContent {
  margin: calc(106px + 8rem) auto 8rem auto;
  width: 350px;
  justify-content: center;
}

#sidepanel {
  position: static;
  margin: 0 auto;
  padding: 0;
}

@media (max-width: 320px) {
  .innerContent {
    transform: scale(0.9);
    margin: 4rem -0.8rem;
  }
}

@media (max-width: 280px) {
  .innerContent {
    transform: scale(0.8);
    margin: 2.5rem -1.7rem;
  }
}
</style>
