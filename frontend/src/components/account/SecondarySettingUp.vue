<template>
<div>
  <!-- <AccountBase :title="$l('set_up.subheader')"> -->
    <Subheader :title="$l('set_up.subheader')"/>
    <SecondarySettings />
    <v-btn
      @click="routerPush('ChooseAStudent')"
      id="done"
      rounded
      outlined
      color="accent"
      >{{ $l("set_up.button") }}</v-btn
    >
  </div>
</template>

<script>
import SecondarySettings from "./SecondarySettings.vue";
import Subheader from "@/components/app/Subheader.vue";

export default {
  permisions: {
    roles: "ALL",
  },
  components: {
    SecondarySettings,
    Subheader
  },
  methods: {
    routerPush(to) {
      this.$router.push({ name: to });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  #buttonWrapper {
    display: none;
  }
}
#done.v-btn {
  margin-top: 3rem;
}
</style>
