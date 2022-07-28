<template>
  <div>
    <Subheader :title="$l('set_up.subheader')" />

    <TutorSettings :value="data" @input="onInput" />

    <ButtonBase :title="$l('set_up.button')" @click="done()" id="done" />
  </div>
</template>

<script lang="ts">
import TutorSettings from "./TutorSettings.vue";
import Subheader from "@/components/app/Subheader.vue";
import { Details } from "./classes/Details";
import ButtonBase from "@/components/global/ButtonBase.vue";

import { isValid, update } from "@/utility/validate";

import { Vue, Component /*, Ref */ } from "vue-property-decorator";

@Component({
  components: { TutorSettings, Subheader, ButtonBase },
  permisions: { roles: ["ROLE_STUDENT", "ROLE_USER"], redirect: "LogIn" },
})
export default class TutorSettingUp extends Vue {

  data = new Details.Tutor();
  inProcess = false;

  async done(data = this.data): Promise<void> {
    if (this.inProcess || !(await isValid(data))) return;

    this.inProcess = true;
    const d = { data: { conferenceLink: this.data.conferenceLink } };
    const r = await this.$store.dispatch("account/upgradeToTutor", d);
    this.inProcess = false;
    if (r.statusText == "OK") this.$router.push({ name: "ChooseAStudent" });
  }
  onInput(data: Details.Tutor) {
    update(this.data, data);
  }
}
</script>

<style lang="scss" scoped>
#done {
  margin-top: 2rem;
}
</style>
