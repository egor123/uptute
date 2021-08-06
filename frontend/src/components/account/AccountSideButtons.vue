<template>
  <div id="container">
    <div id="buttonWrapper">
      <v-btn
        v-for="btn in buttons"
        :key="btn.index"
        :path="btn.path"
        class="pa-2"
        small
        text
        ref="button"
      >
        <v-icon class="mr-2">{{ btn.icon }}</v-icon>
        <p>{{ btn.label }}</p>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttons: Array,
  },
  mounted() {
    this.$refs.button.forEach((btn) => {
      const el = btn.$el;
      el.addEventListener("transitionend", (val) => {
        if (val.propertyName === "transform") btn.opened = this.isHover(el);
      });
      el.addEventListener("click", () => {
        let name = el.getAttribute("path");
        if (
          !this.$mb.isMobileInput() ||
          (btn.opened && this.$route.name != name)
        )
          this.$router.push({ name });
      });
    });
  },
  methods: {
    isHover(el) {
      return el.parentElement.querySelector(":hover") === el;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";
#container {
  @include fill-parent;
  pointer-events: none;
}

#buttonWrapper {
  z-index: 2;
  pointer-events: none;
  $offset: 16rem;
  position: sticky;
  overflow: hidden;
  top: $offset;
  bottom: $offset;
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
    max-width: max-content;
    height: max-content;
    p {
      text-transform: none;
      margin: auto 0;
    }

    .v-icon {
      color: var(--v-header-base);
    }
  }
}
</style>
