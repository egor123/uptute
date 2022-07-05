<template>
  <div>
    <Subheader :title="$l('set_up.subheader')" />
    <PrimarySettings ref="primarySettings" v-model="data" />

    <div id="buttons">
      <v-btn @click="done({ isStudent: true })" rounded outlined color="accent">
        {{ $l("set_up.as_student") }}
      </v-btn>
      <v-btn
        @click="done({ isStudent: false })"
        rounded
        outlined
        color="accent"
      >
        {{ $l("set_up.as_tutor") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import PrimarySettings from "./PrimarySettings.vue";
import Subheader from "@/components/app/Subheader.vue";
import { Details } from "./classes/Details";

export default {
  components: {
    PrimarySettings,
    Subheader,
  },
  data() {
    return {
      data: new Details.User(),
    };
  },
  methods: {
    routerPush(to) {
      this.$router.push({ name: to });
    },
    async done({ isStudent }) {
      if (!this.checkRules()) return;
      const r = await this.upgradeToUser();
      if (r.statusText == "OK")
        this.routerPush(`${isStudent ? "Student" : "Tutor"}SettingUp`);
      else alert("Check your input"); // TODO Validate instead
    },
    checkRules() {
      const refs = this.$refs.primarySettings.$refs;

      const panels = [refs.panelRef, refs.panel2Ref];

      const addChildren = (fields, panel) => [
        ...fields,
        ...panel.$children[0].$children,
      ];
      const inputFields = panels.reduce(addChildren, []);
      return inputFields.every((el) => el.isValid());
    },
    async upgradeToUser(data = this.data) {
      return await this.$store.dispatch("account/upgradeToUser", { data });
    },
    // async updateUserDetails(data) {
    //   console.log(data);
    //   if (this.isUpdating) return;
    //   this.isUpdating = true;
    //   await this.$store.dispatch("account/updateUserDetails", { data });
    //   this.isUpdating = false;
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
#buttons {
  @include flexbox;
  margin-top: 3rem;
  & > *:first-child {
    border-radius: 15px 0 0 15px;
    border-right: 0px;
  }
  & > *:last-child {
    border-radius: 0 15px 15px 0;
    border-left: 1px dashed var(--v-accent-base);
  }
}
</style>

