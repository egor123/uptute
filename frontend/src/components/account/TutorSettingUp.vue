<template>
  <div>
    <!-- <AccountBase :title="$l('set_up.subheader')"> -->
    <Subheader :title="$l('set_up.subheader')" />
    <TutorSettings :data="data" />
    <v-btn @click="done(data)" id="done" rounded outlined color="accent">{{
      $l("set_up.button")
    }}</v-btn>
  </div>
</template>

<script>
import TutorSettings from "./TutorSettings.vue";
import Subheader from "@/components/app/Subheader.vue";

export default {
  data() {
    return {
      data: {
        conferenceLink: null,
        inProcess: false,
      },
    };
  },
  permisions: {
    roles: ["ROLE_STUDENT"],
    redirect: "LogIn",
  },
  components: {
    TutorSettings,
    Subheader,
  },
  methods: {
    routerPush(to) {
      this.$router.push({ name: to });
    },
    async done(data) {
      if (this.inProcess) return;
      this.inProcess = true;
      const res = await this.$store.dispatch("account/upgradeToTutor", {
        data,
      });
      this.inProcess = false;
      if (res.statusText == "OK") this.routerPush("ChooseAStudent");
    },
  },
};
</script>

<style lang="scss" scoped>
#done.v-btn {
  margin-top: 3rem;
}
</style>

