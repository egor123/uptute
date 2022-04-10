<template>
  <div>
    <!-- <AccountBase :title="$l('set_up.subheader')"> -->
    <Subheader :title="$l('set_up.subheader')" />
    <TutorSettings :data="data" />
    <v-btn @click="done()" id="done" rounded outlined color="accent">{{
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
    async done() {
      const bool = await this.$store
        .dispatch("auth/upgradeToTutor")
        .then((r) => r.data);
      // const r = await this.$store.dispatch("auth/getUserDetails");
      if (bool)
        await this.$store.dispatch("auth/tryAddRole", { role: "ROLE_TUTOR" });

      this.routerPush("ChooseAStudent");
    },
  },
};
</script>

<style lang="scss" scoped>
#done.v-btn {
  margin-top: 3rem;
}
</style>

