<template>
  <div>
    <Subheader :title="$l('set_up.subheader')" />
    <TutorSettings v-model="data" ref="TutorSettings" />
    <v-btn @click="done()" id="done" rounded outlined color="accent">
      {{ $l("set_up.button") }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import TutorSettings from "./TutorSettings.vue";
import Subheader from "@/components/app/Subheader.vue";
import { Details } from "./classes/details";

import { Vue, Component, Ref } from "vue-property-decorator";

@Component({
  components: { TutorSettings, Subheader },
  permisions: { roles: ["ROLE_STUDENT", "ROLE_USER"], redirect: "LogIn" },
})
export default class TutorSettingUp extends Vue {
  @Ref() readonly TutorSettings!: TutorSettings;

  data = new Details.Tutor();
  inProcess = false;

  async done(): Promise<void> {
    const passesRules: boolean = await this.TutorSettings.isValid();
    if (this.inProcess || !passesRules) return;

    this.inProcess = true;

    const data = { conferenceLink: this.data.conferenceLink };
    const r = await this.$store.dispatch("account/upgradeToTutor", { data });

    this.inProcess = false;

    if (r.statusText == "OK") this.$router.push({ name: "ChooseAStudent" });
  }
}
</script>

<style lang="scss" scoped>
#done.v-btn {
  margin-top: 3rem;
}
</style>

