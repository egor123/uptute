<template>
  <div class="buttonsContainer">
    <SideButtonBase
      :sideButtons="[
        {
          name: 'mdi-calendar-clock',
          path: $l('acc_pages.calendar'),
          to: { name: 'Calendar' },
        },
        {
          name: 'mdi-account-cog-outline',
          path: $l('acc_pages.settings'),
          to: { name: 'Settings' },
        },
      ]"
    />
  </div>
</template>

<script>
import SideButtonBase from "@/components/sideButtons/SideButtonBase.vue";

export default {
  components: {
    SideButtonBase,
  },
};
</script>
