<template>
  <span>
    <input type="radio" :id="`radio${value}`" :value="value" v-model="input" />
    <label :for="`radio${value}`" :style="getStyles()"> <slot /> </label>
  </span>
</template>

<script>
export default {
  props: ["value", "model", "size"],
  model: {
    prop: "model",
  },
  computed: {
    input: {
      get: function () {
        return this.model;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    getStyles() {
      return `--size: ${this.size ?? 12}px; --padding: ${ this.$slots.default ? 1 : 0 }ch`;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";
// ----- Settings -----
$padding: 1ch;
$margin: 5px;
$color: #c5c5c5;
$active-color: var(--v-accent-base);
$transition-time: 0.4s;
// --------------------
input {
  display: none;
  &:checked + label::after {
    transform: scale(1);
    opacity: 1;
  }
}
label {
  position: relative;
  padding-left: calc(var(--size) + var(--padding));
  margin: $margin;
  @include flexbox;
  &::before,
  &::after {
    content: "";
    position: absolute;
    @include box-size(var(--size));
    left: 0;
    border-radius: 50%;
    cursor: pointer;
  }
  &::before {
    background-color: $color;
  }
  &::after {
    background-color: $active-color;
    transition: transform $transition-time ease-in-out,
      opacity $transition-time ease-in-out;
    transform: scale(0);
    opacity: 0;
  }
}
div {
  display: inline-block;
  @include box-size(10px);
  border-radius: 50%;
}
</style>
