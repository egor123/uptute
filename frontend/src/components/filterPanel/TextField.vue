<template>
  <div
    class="textInput"
    ref="textInput"
    :class="{ errorMovement: errorAnim, errorColor: error }"
    :style="
      `--displayShadow: ${flat ? 'none' : 'flex'};
      --backgroundColor: ${backgroundColor}; 
      --borderRadius: ${borderRadius}`
    "
  >
    <div
      class="slot"
      ref="slot"
      :style="`paddingRight:${img ? '30px' : '0px'}`"
    >
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
      <img v-if="img" :src="getImg(img)" alt="" />
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
  props: {
    value: String,
    rules: Function, // validation, always true if undef
    label: String, // panel's label
    area: Boolean, // changes to textarea
    img: String,
    flat: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: "var(--v-card-base)",
    },
    borderRadius: {
      type: String,
      default: "15px",
    },
  },
  watch: {
    input: function(val) {
      if (this.area) {
        const el = this.$refs.textarea;
        el.style.height = "auto";
        this.$nextTick(() => (el.style.height = el.scrollHeight + "px"));
      }
      if (this.rules != undefined && this.rules(this.input)) this.error = false;
      this.$emit("input", val);
    },
    value: function(val) {
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
    getImg(img) {
      return require(`@/assets/icons/${img}.svg`);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/errorStyles.scss";
@import "@/scss/mixins.scss";

.textInput {
  $color-main: var(--backgroundColor);
  $color-sec: var(--v-secondary-darken2);
  border-radius: var(--borderRadius) !important;
  position: relative;

  &::before {
    @include box-shadow();
    display: var(--displayShadow);
    content: "";
    @include fill-parent(0);
    border-radius: inherit;
    z-index: -1;
  }

  &:not(.errorColor) {
    background-color: $color-main !important;
  }
  width: 100%;
  height: max-content;

  transition: transform 300ms;

  &:hover {
    transform: scale(0.95);
  }

  .slot {
    background: inherit;
    position: relative;
    width: 90%;
    height: max-content;
    margin: auto;

    .input {
      display: block;
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
        transform: scale(0.8) translateY(-50%);
        top: 0;
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
      transform-origin: top left;
      transform: translateY(-50%);
      top: 50%;

      transition: transform, top 0.25s ease-in-out;
    }
    img {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
    }
  }
}
</style>
