<template>
  <AccountBase :title="$l('acc_pages.settings')">
    <SettingsComponent />
  </AccountBase>
</template>

<script>
import SettingsComponent from "@/components/account/SettingsComponent.vue";
import AccountBase from "@/components/account/AccountBase.vue";

export default {
  name: "Settings",
  path: "/settings",
  permisions: {
    roles: "ALL",
  },
  components: {
    SettingsComponent,
    AccountBase,
  },
};
</script>
