<template>
  <v-menu
    transition="scale-transition"
    origin="top right"
    v-model="menuActive"
    bottom
    open-on-hover
    offset-y
    v-if="notices.length > 0"
  >
    <template v-slot:activator="{ on, attrs }">
      <div id="wrapper">
        <v-icon
          :style="`--widthMin: ${widthMin}px`"
          ref="important"
          id="important"
          v-bind="attrs"
          v-on="on"
          >mdi-exclamation</v-icon
        >
      </div>
    </template>

    <v-list>
      <div v-for="(notice, index) in notices" :key="index">
        <v-list-item v-html="notice" />
        <div class="dividor" v-if="index !== notices.length - 1" />
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      menuActive: null,
      notices: [
        "<div style='color: var(--v-primary-lighten3)'>NoName accepted your offer. Your lesson will be held&nbsp<a style='display: inline' href='https://zoom.us/'>here</a>.</div>",
        "<div style='color: var(--v-primary-lighten3)'>NoName accepted your offer. Your lesson will be held&nbsp<a style='display: inline' href='https://zoom.us/'>here</a>.</div>",
      ],
      widthMax: 300,
      widthMin: 50,
    };
  },
  mounted() {
    this.menuActive = false;
  },
  watch: {
    menuActive: function() {
      console.log(this.menuActive);
      if (this.menuActive) {
        this.$refs.important.$el.style.transition =
          "border-radius 200ms, width 300ms 50ms";
        this.$refs.important.$el.style.width = `${this.widthMax}px`;
        this.$refs.important.$el.style.borderRadius = `15px 15px 0 0`;
      } else {
        this.$refs.important.$el.style.transition =
          "border-radius 200ms 100ms, width 300ms";
        this.$refs.important.$el.style.width = `${this.widthMin}px`;
        this.$refs.important.$el.style.borderRadius = `50%`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#wrapper {
  position: absolute;
  right: 25px;
  bottom: -20px;
  @media (pointer: none), (pointer: coarse) {
    right: 10px;
    bottom: -10px;
  }
  transform: translateY(100%);
  height: var(--widthMin);
  width: 300px;
  display: flex;
}

.v-icon#important {
  margin-left: auto;
  color: var(--v-secondary-base);

  background: var(--v-accent-base);
  z-index: 10;

  @include box-shadow();
  @include box-size(var(--widthMin));

  &::before {
    $mult: 1.2;

    @include box-size(var(--widthMin) / $mult);
    transform: scale($mult);
    @include flexbox();
  }
}

.v-menu__content {
  background: transparent;
  @include box-shadow();
  width: 300px;
  border-radius: 0 0 15px 15px;
  .v-list-item {
    margin: 1rem 0;
  }
}
</style>
