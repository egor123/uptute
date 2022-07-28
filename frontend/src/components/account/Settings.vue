<template>
  <div id="container">
    <Subheader :title="$l('acc_pages.settings')" />

    <div id="panels">
      <PrimarySettings :value="details.user" @input="onPrimary" />
      <!-- v-if="isStudent" -->
      <StudentSettings :value="details.student" @input="onStudent" />
      <!-- v-if="isTutor" -->
      <TutorSettings :value="details.tutor" @input="onTutor" />
    </div>

    <ButtonBase :title="$l('settings.save')" @click="saveChanges" />
  </div>
</template>

<script lang="ts">
import Subheader from "@/components/app/Subheader.vue";
import PrimarySettings from "@/components/account/PrimarySettings.vue";
import StudentSettings from "@/components/account/StudentSettings.vue";
import TutorSettings from "@/components/account/TutorSettings.vue";
import { Details } from "./classes/Details";

import { Vue, Component } from "vue-property-decorator";
import { isValid, update } from "@/utility/validate";
import ButtonBase from "../global/ButtonBase.vue";

@Component({
  name: "Settings",
  path: "/settings",
  // permisions: { roles: ["ROLE_USER"], redirect: "LogIn" }, // "ROLE_STUDENT"
  components: {
    Subheader,
    PrimarySettings,
    StudentSettings,
    TutorSettings,
    ButtonBase,
  },
})
export default class Settings extends Vue {
  details = new Details.All();
  isUpdating = false;

  // async mounted() {
  //   const fetch = () =>
  //     this.$store.dispatch("account/getUserDetails").then((r) => r.data);

  //   this.details.update(await fetch());
  // }

  // get isStudent() {
  //   return this.$store.getters[`auth/roles`].includes("ROLE_STUDENT");
  // }
  // get isTutor() {
  //   return this.$store.getters[`auth/roles`].includes("ROLE_TUTOR");
  // }

  async saveChanges(d = this.details) {
    if (
      this.isUpdating ||
      // !(await isValid({ user: d.user, student: d.student, tutor: d.tutor }))
      !(await isValid([d.user, d.student, d.tutor]))
    )
      return;

    this.isUpdating = true;
    await this.$store.dispatch("account/updateUserDetails", { data: d });
    this.isUpdating = false;
  }

  async onPrimary(newVal: Details.User) {
    update(this.details, newVal, "user");
  }
  async onStudent(newVal: Details.Student) {
    update(this.details, newVal, "student");
  }
  async onTutor(newVal: Details.Tutor) {
    update(this.details, newVal, "tutor");
  }
}
</script>

<style lang="scss" scoped>
#container {
  padding: 7rem 0 2rem 0;
  .v-btn {
    margin-top: 2rem;
  }
  #panels > :not(:last-child) {
    margin-bottom: 2rem;
  }
}
</style>
