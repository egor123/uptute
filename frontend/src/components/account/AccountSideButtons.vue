<template>
  <div id="container">
    <div class="buttonWrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

#container {
  @include fill-parent;
  pointer-events: none;
}

::v-deep {
  .buttonWrapper {
    z-index: 2;
    pointer-events: none;
    $offset: 16rem;
    position: sticky;
    overflow: hidden;
    top: $offset;
    bottom: $offset;
    width: 100%;
    & > * {
      pointer-events: auto;
      display: flex;

      @include box-shadow();
      margin-bottom: 0.8rem;
      max-width: max-content;

      background: var(--v-background-base);
      border: 1px solid var(--v-accent-base);

      &,
      * {
        color: var(--v-accent-base);

        .v-icon {
          color: var(--v-accent-base) !important;
        }
      }

      transition: transform 400ms ease-in-out;

      & > * {
        max-width: max-content;
        // height: max-content;
        p {
          text-transform: none;
          margin: auto 0;
        }
      }
    }
  }
}
</style>
