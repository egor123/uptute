<template>
  <span>
    <input type="radio" :id="`radio${value}`" :value="value" v-model="input" />
    <label :for="`radio${value}`"> <slot/> </label>
  </span>
</template>

<script>
export default {
  props: ["value", "model"],
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
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";
// ----- Settings -----
$size: 16px;
$padding: 2px;
$margin: 4px;
$color: #c5c5c5;
$active-color: var(--v-accent-base);
$transition-time: 0.4s;
// --------------------
input {
  display: none;
  &:checked + label::after{
    transform: scale(1);
  }
}
label {
  position: relative;
  padding-left: $size + $padding;
  margin: $margin;
  @include flexbox;
  &::before,
  &::after {
    content: "";
    position: absolute;
    @include box-size($size);
    left: 0;
    border-radius: 50%;
    cursor: pointer;
  }
  &::before {
    background-color: $color;
  }
  &::after {
    background-color: $active-color;
    transition: transform $transition-time ease;
    transform: scale(0);
  }
}
div {
  display: inline-block;
  @include box-size(10px);
  border-radius: 50%;
}
</style>