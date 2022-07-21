<template>
  <LessonMenu
    :ifWithIcon="settings.ifWithIcon"
    :color="settings.color"
    :textColor="settings.textColor"
    :borderRadius="settings.borderRadius"
    :border="settings.border"
    :padding="settings.padding"
  />
</template>

<script lang="ts">
import LessonMenu from "@/components/header/LessonMenu.vue";
import settings from "./settings";
import { MenuSettings } from "./types";

import { Vue, Component } from "vue-property-decorator";

@Component({ components: { LessonMenu } })
export default class HomeLessonMenu extends Vue {
  public settings: MenuSettings = settings;
}
</script>
