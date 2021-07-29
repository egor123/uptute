<template>
  <div
    class="textInput"
    :class="{ errorMovement: errorAnim, errorColor: error }"
  >
    <div class="slot">
      <textarea
        v-if="area"
        type="text"
        class="input"
        rows="1"
        :class="{ active: input != '' && input != null }"
        v-model="input"
        ref="textarea"
      />
      <input
        v-else
        type="text"
        class="input"
        :class="{ active: input != '' && input != null }"
        v-model="input"
      />
      <label>{{ label }}</label>
    </div>
  </div>
</template>

<script>
import { refresh } from "./store.js";
export default {
  data() {
    return {
      error: false,
      errorAnim: false,
      input: this.value,
      def: JSON.parse(JSON.stringify(this.value ?? "")),
    };
  },
  props: [
    "value",
    "rules", // validation, always true if undef
    "label", // panel's label
    "area", // changes to textarea
  ],
  watch: {
    input: function (val) {
      if (this.area) {
        const el = this.$refs.textarea;
        el.style.height = "auto";
        this.$nextTick(() => (el.style.height = el.scrollHeight + "px"));
      }
      if (this.rules != undefined && this.rules(this.input)) this.error = false;
      this.$emit("input", val);
    },
    value: function (val) {
      this.input = val;
    },
  },
  methods: {
    refresh,
    isValid() {
      let val = true;
      if (this.rules !== undefined) val = this.rules(this.input);
      this.errorAnim = false;
      setTimeout(() => {
        this.errorAnim = !val;
      }, 50);
      this.error = !val;
      return val;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/errorStyles.scss";

.textInput {
  $color-main: var(--v-header-base);
  $color-sec: var(--v-secondary-darken2);
  background: $color-main;
  width: 100%;
  height: fit-content;
  transition: all 300ms;
  &:hover {
    background: var(--v-headerHover-base);
    transform: scale(0.95);
  }

  .slot {
    background: inherit;
    position: relative;
    width: 90%;
    margin: auto;

    .input {
      border: 1px $color-sec solid;
      border-radius: 15px;
      width: 100%;
      margin-top: 1em;
      margin-bottom: 1em;
      padding: 10px;
      &:focus {
        outline: none;
      }
      &:focus ~ label,
      &.active ~ label {
        transform: scale(0.8);
      }
    }
    textarea {
      resize: none;
      overflow: hidden;
    }
    label {
      position: absolute;
      background: inherit;
      border-radius: 15px;
      padding: 0 3px 0 3px;
      left: 0.75em;
      color: $color-sec;
      pointer-events: none;
      transform-origin: bottom left;
      transform: translateY(111%);
      transition: transform 0.25s ease-in-out;
    }
  }
}
</style>