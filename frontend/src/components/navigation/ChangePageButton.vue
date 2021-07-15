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

<style scoped lang="scss">
@import "@/scss/mixins.scss";
button {
  position: relative;
  @include box-size(40px);
  border: 2px solid lighten($color: #000000, $amount: 80);
  border-radius: 3px;
  box-shadow: -3px 7px 20px 1px rgba(0, 0, 0, 0.7);
  margin: 1px;
  background: white;

  &:hover {
    background: darken($color: white, $amount: 5);
  }
  &[active] {
    border-color: var(--v-accent-base);
  }

  &::after {
    content: attr(type);
  }
  &[type="previous"]::after {
    content: "‹";
  }
  &[type="next"]::after {
    content: "›";
  }
  &[type="disabled"] {
    background: darken($color: white, $amount: 5);
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
  &:only-child{
    border-radius: 50%;
  }
}
</style>