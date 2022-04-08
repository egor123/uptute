<template>
  <Background>
    <BackgroundCard>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </BackgroundCard>
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";
import BackgroundCard from "@/components/global/background/BackgroundCard.vue";
import PrimarySettingUp from "@/components/account/PrimarySettingUp.vue";
import SecondarySettingUp from "@/components/account/SecondarySettingUp.vue";

export default {
  children: [
    {
      name: "PrimarySettingUp",
      path: "primary",
      component: PrimarySettingUp,
    },
    {
      name: "SecondarySettingUp",
      path: "secondary",
      component: SecondarySettingUp,
    },
  ],
  components: {
    Background,
    BackgroundCard,
  },
};
</script>

<style scoped lang="scss"></style>

