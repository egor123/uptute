<template>
  <Background :title="title">
    <BackgroundCard>
      <AccountSideButtons />
      <slot />
    </BackgroundCard>
  </Background>
</template>

<script>
import Background from "@/components/background/Background.vue";
import BackgroundCard from "@/components/background/BackgroundCard.vue";

import AccountSideButtons from "@/components/sideButtons/AccountSideButtons.vue";

export default {
  components: {
    Background,
    BackgroundCard,

    AccountSideButtons,
  },
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
::v-deep #backgroundCard {
  // width: max-content;
  // max-width: 100%;
  // background: var(--v-card-base) !important;
  width: 100vw;
  max-width: 100%;
  padding: 0;
  margin: 156px 0 7rem 0;
  background: #ffffff00 !important;

  @media (max-width: 600px) {
    width: 100%;
    background: #ffffff00 !important;
  }
}
</style>
