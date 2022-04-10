<template>
  <!-- <AccountBase :title="$l('set_up.subheader')"> -->
  <div>
    <Subheader :title="$l('set_up.subheader')" />
    <PrimarySettings :data="data" />

    <div id="buttons">
      <v-btn
        @click="routerPush('StudentSettingUp')"
        id="student"
        rounded
        outlined
        color="accent"
      >
        {{ $l("set_up.as_student") }}
      </v-btn>
      <v-btn
        @click="routerPush('TutorSettingUp')"
        id="tutor"
        rounded
        outlined
        color="accent"
      >
        {{ $l("set_up.as_tutor") }}</v-btn
      >
    </div>
  </div>
</template>

<script>
import PrimarySettings from "./PrimarySettings.vue";
import Subheader from "@/components/app/Subheader.vue";

export default {
  components: {
    PrimarySettings,
    Subheader,
  },
  data() {
    return {
      checkbox: false,
      data: {
        firstName: null,
        lastName: null,
        birthday: null,
        grade: null,
      },
    };
  },
  methods: {
    routerPush(to) {
      this.$router.push({ name: to });
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

// ::v-deep {
//   #buttonWrapper {
//     display: none;
//   }
// }

#buttons {
  @include flexbox;
  margin-top: 3rem;
  #student {
    border-radius: 15px 0 0 15px;
    border-right: 0px;
  }
  #tutor {
    border-radius: 0 15px 15px 0;
    border-left: 1px dashed var(--v-accent-base);
  }
}
</style>

