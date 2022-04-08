<template>
  <div>
    <!-- <AccountBase :title="$l('set_up.subheader')"> -->
    <Subheader :title="$l('set_up.subheader')" />
    <SecondarySettings />
    <v-btn @click="done()" id="done" rounded outlined color="accent">{{
      $l("set_up.button")
    }}</v-btn>
  </div>
</template>

<script>
import SecondarySettings from "./SecondarySettings.vue";
import Subheader from "@/components/app/Subheader.vue";

export default {
  permisions: {
    roles: ["ROLE_STUDENT"],
    redirect: "LogIn",
  },
  components: {
    SecondarySettings,
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
      if (bool) this.$store.dispatch("auth/tryAddRole", { role: "ROLE_TUTOR" });

      this.routerPush("ChooseAStudent");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  #buttonWrapper {
    display: none;
  }
}
#done.v-btn {
  margin-top: 3rem;
}
</style>

