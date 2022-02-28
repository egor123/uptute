<template>
  <v-expansion-panel id="panel" :class="{ errorMovement: errorAnim }">
    <v-expansion-panel-header hover="false" :class="{ errorColor: error }">
      {{ label }}
      <div class="text-right mr-3 secondary--text text--darken-2">
        {{ text }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content id="expPanelContent">
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
@import "@/scss/mixins.scss";

#panel {
  transition: transform 400ms;
  margin: 0;
  background: var(--v-card-base);

  border-radius: 0;
  &::before {
    @include box-shadow();
    z-index: -1;
  }
  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  &:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
  .v-expansion-panel-header {
    background-color: transparent;

    border-radius: inherit;
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
