<template>
  <v-menu
    offset-y
    open-on-hover
    hide-on-scroll
    transition="scale-transition"
    origin="top center"
    attach="#title"
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" id="title" ref="activator">
        <!-- !!!!!!!!!!! -->
        <slot name="title" />
      </div>
    </template>
    <v-list
      ref="list"
      :style="
        `--color: ${color}; 
        --textColor: ${textColor}; 
        --borderRadius: ${borderRadius}; 
        --border: ${border}`
      "
    >
      <!-- !!!!!!!!!!! -->
      <slot name="content" />
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    color: String,
    textColor: String,
    borderRadius: String,
    border: String,
  },
  methods: {
    openMenu() {
      let activator = this.$refs.activator;
      for (let i = 100; i > 0; i--) {
        setTimeout(() => {
          let list = this.$refs.list.$el;

          console.log(list.offsetWidth);
          console.log(activator.offsetWidth);
          if (list.offsetWidth > activator.offsetWidth) {
            document.documentElement.style.setProperty(
              "--menuMarginLeft",
              -(list.offsetWidth - activator.offsetWidth) / 2 + "px"
            );
          }
        }, 10);
      }
    },
  },
  mounted() {
    this.$refs.activator.addEventListener("mouseover", this.openMenu);
    this.$refs.activator.addEventListener("click", this.openMenu);
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
:root {
  --menuMarginLeft: 0px;

  #title {
    height: 100%;
    width: max-content;
    cursor: default;
    @include flexbox();
    // padding: 0.5rem 1rem;
    margin: 0 auto;

    color: var(--v-accent-base) !important;

    text-transform: uppercase;
    text-align: center;
    letter-spacing: 3px;
    font-weight: 500;
  }

  .v-menu__content {
    box-shadow: none;
    border-radius: 0px;
    transition: transform 0.3s, opacity 0.3s, margin 0.3s !important;
    margin-left: var(--menuMarginLeft);

    .v-list {
      background: var(--color) !important;
      border-radius: var(--borderRadius);
      border: var(--border);
    }
  }
}
::v-deep {
  .v-list-item > * {
    margin: 0;

    width: 100%;
    &.v-btn,
    .v-btn {
      border-radius: 50px;
      width: 100%;
      color: var(--textColor) !important;
      text-transform: none;
      img,
      .v-icon {
        margin-right: 10px;
        @include box-size(1.5rem);
        color: var(--v-background-base);
      }
    }
  }
}
</style>
