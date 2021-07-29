<template>
  <v-expansion-panel id="panel" :class="{ errorMovement: errorAnim }">
    <v-expansion-panel-header hover="false" :class="{ errorColor: error }">
      {{ label }}
      <div class="text-right mr-3 secondary--text text--darken-2">
        {{ text }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      id="expPanelContent"
    >
      <slot />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  data: () => ({
    error: false,
    errorAnim: false,
  }),
  props: [
    "label", // panel's label
    "text", // panel's text
  ],
};
</script>

<style lang="scss" scoped>
@import "@/scss/errorStyles.scss";

#panel {
  transition: transform 400ms;
  margin: 0;
  background: var(--v-header-base);
  .v-expansion-panel-header {
    background-color: var(--v-header-base);
    transition: all 300ms;
    &:hover {
      background-color: var(--v-headerHover-base);
    }
  }
  &:hover {
    transform: scale(0.95);
  }
}

::v-deep {
  .v-slider__track-container .v-slider__track-background.primary {
    background: var(--v-secondary-darken1) !important;
  }
}
</style>
