<template>
  <div id="container">
    <Subheader :title="$l('acc_pages.settings')" />

    <PrimarySettings v-model="details.userDetails" />
    <StudentSettings v-model="details.studentDetails" v-if="isStudent" />
    <TutorSettings v-model="details.tutorDetails" v-if="isTutor" />

    <v-btn @click="saveChanges" rounded outlined color="accent">
      {{ $l("settings.save") }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import Subheader from "@/components/app/Subheader.vue";
import PrimarySettings from "@/components/account/PrimarySettings.vue";
import StudentSettings from "@/components/account/StudentSettings.vue";
import TutorSettings from "@/components/account/TutorSettings.vue";
import { Details } from "./classes/details";

import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "Settings",
  path: "/settings",
  permisions: { roles: [], redirect: "LogIn" }, // "ROLE_STUDENT"
  components: { Subheader, PrimarySettings, StudentSettings, TutorSettings },
})
export default class Settings extends Vue {
  details = new Details.All();
  isUpdating = false;

  async mounted() {
    const fetch = () =>
      this.$store.dispatch("account/getUserDetails").then((r) => r.data);

    this.details.update(await fetch());
  }

  get isStudent() {
    return this.$store.getters[`auth/roles`].includes("ROLE_STUDENT");
  }
  get isTutor() {
    return this.$store.getters[`auth/roles`].includes("ROLE_TUTOR");
  }

  async saveChanges(data = this.details) {
    if (this.isUpdating) return;
    this.isUpdating = true;
    await this.$store.dispatch("account/updateUserDetails", { data });
    this.isUpdating = false;
  }
}
</script>

<style lang="scss" scoped>
#container {
  padding: 7rem 0 2rem 0;
  .v-btn {
    margin-top: 2rem;
  }
}
</style>

