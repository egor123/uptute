<template>
  <div
    id="container"
    :class="{}"
    :style="`--displayShadow: ${flat ? 'none' : 'flex'};
      --backgroundColor: ${backgroundColor}; 
      --borderRadius: ${borderRadius}`"
  >
    <div
      class="textInput"
      ref="textInput"
      :class="{ errorColor: error, errorMovement: errorAnim }"
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
          ref="textarea"
          v-model="input"
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
      <ErrorMsg :msg="errMsg" />
    </div>
  </div>
</template>

<script>
import { refresh } from "./store.js";
import ErrorMsg from "./ErrorMsg.vue";

export default {
  data() {
    return {
      error: false,
      errorAnim: false,
      input: this.value,
      def: JSON.parse(JSON.stringify(this.value ?? "")),
    };
  },
  components: { ErrorMsg },
  props: {
    value: String,
    isError: {
      type: Object,
      default: () => ({
        color: null,
        animation: null,
        msg: "",
      }),
    },
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
      // msg: "",
    },
    borderRadius: {
      type: String,
      default: "15px",
    },
    errMsg: {
      type: String,
      default: "",
    },
  },
  computed: {
    isErrorColor() {
      return this.isError.color;
    },
    isErrorAnimation() {
      return this.isError.animation;
    },
  },
  watch: {
    isErrorColor(isErrorColor) {
      this.error = isErrorColor;
    },
    isErrorAnimation(isErrorAnimation) {
      this.errorAnim = isErrorAnimation;
    },
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
    getImg(img) {
      return require(`@/assets/icons/${img}.svg`);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/errorStyles.scss";
@import "@/scss/mixins.scss";

#container {
  $color-main: var(--backgroundColor);
  $color-sec: var(--v-secondary-darken2);
  width: 100%;

  transition: transform 300ms;

  &:hover {
    transform: scale(0.95);
  }

  .textInput {
    position: relative;
    height: fit-content;
    width: 100%;
    padding: 0px 5%;
    background: $color-main;
    border-radius: var(--borderRadius) !important;
    padding-top: 22px;

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
    &.errorColor {
      input {
        border-color: var(--v-error-base) !important;
      }
      label {
        color: var(--v-error-base) !important;
      }
    }

    .slot {
      background: inherit;
      position: relative;
      height: max-content;
      z-index: 1;

      .input {
        display: block;
        border: 1px solid $color-sec;
        border-radius: 15px;
        width: 100%;
        padding: 10px;
        background: inherit;
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
}
</style>
