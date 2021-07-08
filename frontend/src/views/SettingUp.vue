<template>
  <Background :title="$l('set_up.subheader')">
    <BackgroundCard>
      <SettingsComponent />
    </BackgroundCard>
  </Background>
</template>

<script>
import Background from "@/components/background/Background.vue";
import BackgroundCard from "@/components/background/BackgroundCard.vue";

import SettingsComponent from "@/components/account/SettingsComponent.vue";

export default {
  name: "SettingUp",
  path: "/setting_up",
  permisions: {
    roles: "USER",
    redirect: "Register",
  },
  components: {
    Background,
    BackgroundCard,

    SettingsComponent,
  },
};
</script>

<style lang="scss" scoped>
::v-deep #backgroundCard {
  max-width: 25rem !important;
  background: #ffffff00 !important;
  padding: 0;
}
</style>
