<template>
  <div id="container">
    <Subheader :title="$l('acc_pages.settings')" />

    <PrimarySettings :value="details.userDetails" @input="onPrimary" />
    <!-- <StudentSettings v-model="details.studentDetails" v-if="isStudent" />
    <TutorSettings v-model="details.tutorDetails" v-if="isTutor" /> -->

    <ButtonBase :title="$l('settings.save')" @click="saveChanges" />
  </div>
</template>

<script lang="ts">
import Subheader from "@/components/app/Subheader.vue";
import PrimarySettings from "@/components/account/PrimarySettings.vue";
import StudentSettings from "@/components/account/StudentSettings.vue";
import TutorSettings from "@/components/account/TutorSettings.vue";
import { Details } from "./classes/Details";

import { Vue, Component, Watch } from "vue-property-decorator";
import { isValid, isChangeValid } from "@/utility/validate";
import ButtonBase from "../global/ButtonBase.vue";
import { ValidatableField } from "@/types";
import { copy } from "@/utility/methods";

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

  async saveChanges(data = this.details) {
    if (this.isUpdating || !(await isValid(this.details.userDetails))) return;

    this.isUpdating = true;
    await this.$store.dispatch("account/updateUserDetails", { data });
    this.isUpdating = false;
  }

  async onPrimary(newVal: Details.User) {
    const oldVal: Details.User = copy(this.details.userDetails);
    this.details.update({ userDetails: newVal });
    isChangeValid(this.details.userDetails, oldVal);
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
