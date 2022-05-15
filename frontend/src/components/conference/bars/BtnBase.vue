<template>
  <button :style="`--background: ${bgColor};`" :color="bgColor">
    <v-icon color="light">mdi-{{ mdiIcon }}</v-icon>
  </button>
</template>

<script>
export default {
  props: {
    mdiIcon: String,
    bgColor: {
      type: String,
      default: "var(--v-btnOn-base)",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

button {
  @include box-size(fit-content);
  padding: 12px !important;
  border-radius: 50%;
  background: var(--background);
  margin: 6px;

  transition: transform 300ms;
  &:hover {
    transform: scale(0.9);
  }
}
</style>
