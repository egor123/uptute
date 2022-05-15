<template>
  <button
    @click="$emit('click')"
    :style="`--background: ${bgColor};`"
    :color="bgColor"
  >
    <v-icon color="light"> mdi-{{ curIcon }} </v-icon>
  </button>
</template>

<script>
export default {
  data() {
    return {
      curIcon: "",
    };
  },
  props: {
    icons: Object,
    bgColor: {
      type: String,
      default: "var(--v-btnOn-base)",
    },
    isToggled: Boolean,
  },
  mounted() {
    this.setCurIcon();
  },
  methods: {
    setCurIcon() {
      const type = this.isToggled ? "on" : "off";
      this.curIcon = this.icons[type];
    },
  },
  watch: {
    isToggled() {
      this.setCurIcon();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

button {
  @include box-size(fit-content);
  padding: 12px !important;
  border-radius: 50%;
  background: var(--background);
  margin: 6px;

  transition: transform 300ms;
  &:hover {
    transform: scale(0.9);
  }
}
</style>
