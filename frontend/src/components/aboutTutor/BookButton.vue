<template>
  <div id="buttonWrapper" ref="buttonWrapper">
    <v-btn class="orangeBackground pa-2" small text>
      <!-- <v-icon class="mr-1">mdi-play-circle</v-icon> -->
      <!-- <v-icon class="mr-1">mdi-play-circle-outline</v-icon> -->
      <!-- <v-icon class="mr-1">mdi-play</v-icon> -->
      <!-- <v-icon class="mr-1">mdi-calendar-arrow-right</v-icon> -->
      <!-- <v-icon class="mr-1">mdi-calendar-check</v-icon> -->
      <!-- <v-icon class="mr-1">mdi-calendar-check-outline</v-icon> -->
      <v-icon class="mr-2">mdi-credit-card-outline</v-icon>
      <!-- <v-icon class="mr-1">mdi-calendar-clock</v-icon> -->
      <!-- <v-icon class="mr-1">mdi-calendar-clock-outline</v-icon> -->
      <!-- <v-icon class="mr-1">mdi-calendar-cursor</v-icon> -->
      <!-- <v-icon class="mr-1">mdi-cash</v-icon> -->
      <!-- <v-icon class="mr-1">mdi-cart-plus</v-icon> -->

      {{ $l("tutor.btn") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    to: Object,
  },
  mounted() {
    const wrapper = this.$refs.buttonWrapper;
    var opened = false;
    wrapper.addEventListener("transitionend", (val) => {
      if (val.propertyName === "transform") opened = this.isHover(wrapper);
    });
    wrapper.querySelector("*").addEventListener("click", () => {
      if (!this.isTouchInput() || opened) this.$router.push(this.to);
    });
  },
  methods: {
    isHover(el) {
      return el.parentElement.querySelector(":hover") === el;
    },
    isTouchInput() {
      return window.matchMedia("(pointer: coarse)").matches;
    },
  },
};
</script>

<style scoped lang="scss">
#buttonWrapper {
  position: sticky;
  overflow: hidden;
  top: 30vh;
  margin-left: auto;
  padding: 2rem 0;
  width: fit-content;
  & > * {
    padding: 15px;
    border-radius: 15px 0 0 15px !important;
    transition: transform 600ms ease-in-out;
    &:not(:hover) {
      transform: translateX(76%);
    }
  }
}
</style>
