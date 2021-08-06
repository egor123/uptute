<template>
  <Background>
    <AccountSideButtons
      :buttons="[
        {
          icon: 'mdi-calendar',
          label: $l('acc_pages.calendar'),
          path: 'Calendar',
        },
        {
          icon: 'mdi-close',
          label: $l('acc_pages.logs'),
          path: 'Logs',
        },
        {
          icon: 'mdi-account-cog-outline',
          label: $l('acc_pages.settings'),
          path: 'Settings',
        },
      ]"
    />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";
import AccountSideButtons from "@/components/account/AccountSideButtons.vue";
import Calendar from "@/components/account/Calendar.vue";
import Logs from "@/components/account/Logs.vue";
import Settings from "@/components/account/Settings.vue";

export default {
  children: [
    {
      name: "Calendar",
      path: "calendar",
      component: Calendar,
    },
    {
      name: "Logs",
      path: "logs",
      component: Logs,
    },
    {
      name: "Settings",
      path: "settings",
      component: Settings,
    },
  ],
  components: {
    Background,
    AccountSideButtons,
  },
};
</script>
