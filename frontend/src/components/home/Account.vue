<template>
  <Account
    :ifWithIcon="settings.ifWithIcon"
    :color="settings.color"
    :textColor="settings.textColor"
    :borderRadius="settings.borderRadius"
    :border="settings.border"
    :padding="settings.padding"
  />
</template>

<script lang="ts">
import Account from "@/components/header/Account.vue";
import settings from "./settings";

import { Vue, Component } from "vue-property-decorator";
import { MenuSettings } from "./types";

@Component({ components: { Account } })
export default class HomeAccountMenu extends Vue {
  public settings: MenuSettings = settings;
}
</script>
