<template>
  <button @click="$emit('click')" :type="type" :active="active" />
</template>

<script>
export default {
  props: {
    type: String,
    active: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
button {
  position: relative;
  @include box-size(2rem);

  background: transparent;
  color: darken($color: white, $amount: 50);

  border-top: 1px solid darken($color: white, $amount: 16);
  border-bottom: 1px solid darken($color: white, $amount: 16);

  transition: background-color 200ms;
  &:hover {
    background-color: darken($color: white, $amount: 10);
  }
  &[active] {
    color: var(--v-accent-base);
  }

  &::after {
    content: attr(type);
  }
  &[type="previous"]::after {
    content: "‹";
  }
  &[type="next"]::after {
    content: "›";
    background: none;
  }
  &[type="disabled"] {
    // background: darken($color: white, $amount: 4);
    background: transparent;
    cursor: auto;
    &::after {
      content: "...";
    }
  }

  &:first-child {
    border-radius: 50% 0 0 50%;
  }

  &:last-child {
    border-radius: 0 50% 50% 0;
  }
  &:only-child {
    border-radius: 50%;
  }
}
</style>
