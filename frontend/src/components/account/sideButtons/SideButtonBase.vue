<template>
  <div id="container">
    <div id="buttonWrapper" ref="buttonWrapper">
      <v-btn
        v-for="sideButton in sideButtons"
        :key="sideButton.id"
        :to="sideButton.to"
        class="pa-2"
        small
        text
      >
        <v-icon class="mr-2">{{ sideButton.name }}</v-icon>
        {{ sideButton.path }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: Object,
    sideButtons: Array,
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
@import "@/scss/mixins.scss";
#container {
  @include fill-parent;
}

#buttonWrapper {
  z-index: 2;
  pointer-events: none;
  $offset: 16rem;
  position: sticky;
  overflow: hidden;
  top: $offset;
  bottom: $offset; //padding-bottom: $offset; ????
  margin-left: auto;
  width: max-content;
  & > * {
    pointer-events: auto;
    display: flex;
    margin-left: auto;
    padding: 15px;
    border-radius: 15px 0 0 15px !important;
    transition: transform 400ms ease-in-out;
    &:not(:hover) {
      transform: translateX(calc(100% - 35px));
      // transform: translateX(0%);
    }
  }
}

::v-deep {
  .v-btn {
    background: var(--v-accent-base);
    max-width: max-content;
    margin-bottom: 0.8rem;
    box-shadow: 1px 2px 4px 0px var(--v-secondary-darken3);
    color: var(--v-header-base);
  }
  .v-btn__content {
    // @include flexbox();
    // justify-content: center;
    max-width: max-content;
    height: max-content;
    .v-icon {
      color: var(--v-header-base);
    }
  }
}
</style>
