<template>
  <AccountBase :title="$l('set_up.subheader')">
    <SecondarySettings />
    <v-btn id="done" rounded outlined color="accent">{{
      $l("set_up.button")
    }}</v-btn>
  </AccountBase>
</template>

<script>
import SecondarySettings from "@/components/account/SecondarySettings.vue";
import AccountBase from "@/components/account/AccountBase.vue";

export default {
  permisions: {
    roles: "ALL",
  },
  components: {
    SecondarySettings,
    AccountBase,
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
