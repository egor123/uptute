<template>
  <div class="baseCard">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.baseCard {
  width: 350px;
  height: max-content;
  border-radius: 15px;
  margin-bottom: 6px;
  background: var(--v-secondary-base);
  flex-wrap: wrap;
  opacity: 0.4;
  transition: opacity 800ms;

  padding: 15px;
  text-align: left;
  &:hover {
    opacity: 1;
  }
}
</style>
