<template>
  <HeaderMenu
    color="#000"
    textColor="var(--v-background-base)"
    borderRadius="15px"
    border="none"
    justifyContent="flex-end"
    paddingTop="10px"
    transformOrigin="right top"
    :onHover="false"
  >
    <template v-slot:title>
      <v-icon id="account"> mdi-account-circle </v-icon>
    </template>

    <template v-slot:content>
      <!-- <HeaderListItem
        @click="goTo('Profile')"
        icon="mdi-account"
        :text="$l('acc_pages.profile')"
      /> -->
      <!-- <HeaderListItem
        @click="goTo('Calendar')"
        icon="mdi-calendar-clock"
        :text="$l('acc_pages.calendar')"
      /> -->
      <!-- <HeaderListItem
        @click="goTo('Logs')"
        icon="mdi-calendar-check"
        :text="$l('acc_pages.logs')"
      /> -->
      <HeaderListItem
        @click="goTo('Settings')"
        icon="mdi-account-cog"
        :text="$l('acc_pages.settings')"
      />
      <HeaderListItem
        @click="logout"
        icon="mdi-logout"
        :text="$l('acc_pages.log_out')"
        color="var(--v-accent-base)"
      />
    </template>
  </HeaderMenu>
</template>

<script>
import HeaderMenu from "@/components/header/HeaderMenu.vue";
import { goTo } from "@/plugins/utilityMethods";
import HeaderListItem from "./HeaderListItem";

export default {
  components: {
    HeaderMenu,
    HeaderListItem,
  },
  methods: {
    goTo,
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.v-icon#account {
  color: var(--v-background-base);
  font-size: 30px;
  cursor: pointer;
  @include hoverOpacity();
}

.v-btn {
  width: fit-content !important;
}
</style>

