<template>
  <div>
    <Subheader :title="$l('set_up.subheader')" />

    <PrimarySettings :value="data" @input="onInput" />

    <div id="buttons">
      <AsStudent @click="done({ isStudent: true })" />
      <AsTutor @click="done({ isStudent: false })" />
    </div>
  </div>
</template>

<script lang="ts">
import PrimarySettings from "./PrimarySettings.vue";
import Subheader from "@/components/app/Subheader.vue";
import { Details } from "./classes/Details";
import AsStudent from "@/components/account/primary/settingUp/buttons/AsStudent.vue";
import AsTutor from "@/components/account/primary/settingUp/buttons/AsTutor.vue";

import { copy, goTo } from "@/utility/methods";
import { isChangeValid, isValid, update } from "@/utility/validate";

import { Vue, Component, Watch } from "vue-property-decorator";
import { Done } from "@/components/account/primary/settingUp/types";

@Component({
  components: {
    PrimarySettings,
    Subheader,
    AsStudent,
    AsTutor,
  },
})
export default class PrimarySettingUp extends Vue {
  data = new Details.User();

  async done({ isStudent }: Done): Promise<void> {
    const data = this.data;

    if (!(await isValid(data))) return;

    const r = await this.$store.dispatch("account/upgradeToUser", { data });

    r.statusText == "OK"
      ? goTo(`${isStudent ? "Student" : "Tutor"}SettingUp`)
      : alert("Check your input"); // TODO Validate instead
  }

 onInput(data: Details.User) {
    update(this.data, data)
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
#buttons {
  @include flexbox;
  margin-top: 3rem;
}
</style>
