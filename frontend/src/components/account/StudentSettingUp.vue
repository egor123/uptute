<template>
  <div>
    <Subheader :title="$l('set_up.subheader')" />

    <StudentSettings :value="data" @input="onInput" />

    <ButtonBase :title="$l('set_up.button')" @click="done" id="btn" />
  </div>
</template>

<script lang="ts">
import StudentSettings from "./StudentSettings.vue";
import Subheader from "@/components/app/Subheader.vue";
import { Details } from "./classes/Details";
import { isValid, update } from "@/utility/validate";

import { Vue, Component } from "vue-property-decorator";
import { goTo } from "@/utility/methods";
import ButtonBase from "../global/ButtonBase.vue";

@Component({ components: { StudentSettings, Subheader, ButtonBase } })
export default class StudentSettingUp extends Vue {
  data: Details.Student = new Details.Student();
  inProcess: boolean = false;

  async done(data = this.data) {
    if (this.inProcess || !(await isValid(this.data))) return;

    this.inProcess = true;
    const d = { data };
    const r = await this.$store.dispatch("account/upgradeToStudent", d);
    this.inProcess = false;
    if (r.statusText == "OK") goTo("FindATutor");
  }

  onInput(data: Details.Student) {
    update(this.data, data);
  }
}
</script>

<style lang="scss" scoped>
#btn {
  margin-top: 3rem;
}
</style>
