<template>
  <div
    class="textInput"
    :class="{ errorMovement: errorAnim, errorColor: error }"
    ref="base"
  >
    <div class="slot">
      <textarea
        v-if="area"
        type="text"
        class="input"
        rows="1"
        :class="{ active: input != '' }"
        v-model="input"
        ref="textarea"
      />
      <input
        v-else
        type="text"
        class="input"
        :class="{ active: input != '' }"
        v-model="input"
      />
      <label>{{ label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    error: false,
    errorAnim: false,
    input: "",
  }),
  props: [
    "rules", // validation, always true if undef
    "label", // panel's label
    "area", // changes to textarea
    "propURL", // prop's name in URL query
  ],
  mounted() {
    this.$refs.base.refresh = this.refresh;
    this.$refs.base.isValid = this.isValid;

    var val = this.$route.query[this.propURL];
    if (val !== undefined) this.input = JSON.parse(val);
    else this.input = "";
  },
  watch: {
    input: function (val) {
      if (this.area) {
        const el = this.$refs.textarea;
        el.style.height = "auto";
        this.$nextTick(() => (el.style.height = el.scrollHeight + "px"));
      }

      var params = JSON.parse(JSON.stringify(this.$route.query));
      params[this.propURL] = JSON.stringify(val);
      this.$router.replace({ query: params }).catch(() => {});
      if (this.verify()) this.error = false;
    },
  },
  methods: {
    refresh() {
      // refresh value
      this.input = "";
    },
    isValid() {
      // check if value is valid
      const val = this.verify();
      this.errorAnim = false;
      setTimeout(() => {
        this.errorAnim = !val;
      }, 50);
      this.error = !val;
      return val;
    },
    verify() {
      if (this.rules === undefined) return true;
      return this.rules(this.input);
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
    width: fit-content;
    margin: auto;

    .input {
      border: 1px $color-sec solid;
      border-radius: 15px;
      width: 19rem;
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