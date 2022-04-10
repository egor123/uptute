<template>
  <div id="container">
    <Subheader :title="$l('acc_pages.settings')" />
    <PrimarySettings :data="data" />
    <SecondarySettings :data="data" v-if="roles.includes('ROLE_TUTOR')" />
    <v-btn @click="saveChanges(data)" id="save" rounded outlined color="accent">
      {{ $l("settings.save") }}</v-btn
    >
  </div>
</template>

<script>
import Subheader from "@/components/app/Subheader.vue";
import PrimarySettings from "@/components/account/PrimarySettings.vue";
import SecondarySettings from "@/components/account/SecondarySettings.vue";
import { apiRequest } from "@/services/api.service.js";

export default {
  name: "Settings",
  path: "/settings",
  permisions: {
    roles: ["ROLE_STUDENT"],
    redirect: "LogIn",
  },
  components: {
    Subheader,
    PrimarySettings,
    SecondarySettings,
  },
  computed: {
    roles: function() {
      return this.$store.getters["auth/roles"];
    },
  },
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    this.getUserDetails();
  },
  methods: {
    async getUserDetails() {
      this.data = await apiRequest({
        method: "get",
        urlEnd: "/account/me",
      }).then((r) => r.data);
    },
    async saveChanges(data) {
      await apiRequest({
        method: "patch",
        urlEnd: "/account/me",
        data,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .nameAndAge {
    margin-bottom: 2rem !important;
  }
}
#container {
  padding-top: 7rem;
  padding-bottom: 2rem;
}
#save {
  margin-top: 3rem;
}
</style>

