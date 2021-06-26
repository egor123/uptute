<template>
  <div app id="header">
    <slot/>
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    title: String(),
  },
};
</script>

<style scoped>
#header {
  position: fixed;
  width: 100vw;
  opacity: 0.7;
  background-color: var(--v-header-base);
  padding: 10px;
  z-index: 2;
  box-shadow: 0px 2px 6px var(--v-secondary-darken1);
}
</style>
