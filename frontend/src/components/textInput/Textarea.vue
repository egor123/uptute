<template>
  <v-textarea
    :label="label"
    auto-grow
    filled
    rounded
    rows="1"
    row-height="16"
  />
</template>

<script>
export default {
  props: {
    label: String,
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  textarea {
    border: solid 1px var(--v-background-base);
    border-radius: 15px;

    padding: 0.5rem 0.5rem !important;
    margin: 1rem 0 !important;
  }

  .v-input__slot {
    margin: 0 !important;
    background: var(--v-header-base) !important;
  }

  .v-text-field__details {
    display: none;
  }

  .v-text-field__slot {
    margin: 0 !important;

    .v-label {
      color: var(--v-secondary-darken2) !important;
      background: var(--v-header-base);
      border-radius: 15px;
      overflow: visible;
      transform: translateY(-0.1rem);
      padding: 0.3rem;
      margin: 0.45rem 0 0 0.5rem;

      &--active {
        transform: translate(0, -1.1rem) scale(0.8);
      }
    }
  }
}
</style>
