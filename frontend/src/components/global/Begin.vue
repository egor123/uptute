<template>
  <v-menu
    v-if="!getStatus"
    offset-y
    open-on-hover
    hide-on-scroll
    transition="scale-transition"
    origin="top center"
  >
    <!-- attach="#container" -->
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" id="begin">
        {{ $l("app.pages.begin") }}
      </div>
    </template>
    <v-list
      :style="
        `--color: ${color}; --textColor: ${textColor}; --borderRadius: ${borderRadius}; --border: ${border}`
      "
    >
      <v-list-item>
        <GoogleSignIn>
          <v-btn text id="google"> <v-icon>mdi-google</v-icon>Sign in</v-btn>
        </GoogleSignIn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import GoogleSignIn from "@/components/account/GoogleSignIn.vue";

export default {
  components: {
    GoogleSignIn,
  },
  props: {
    color: String,
    textColor: String,
    borderRadius: String,
    border: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#begin {
  height: 100%;
  width: max-content;
  cursor: default;
  @include flexbox();
  padding: 0.5rem 1rem;
  margin: 0 auto;

  color: var(--v-accent-base) !important;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 3px;
}

.v-menu__content {
  //   background: transparent;
  //   border-radius: 0 0 15px 15px;

  //   box-shadow: 2px 4px 8px -3px var(--v-secondary-darken1);
  box-shadow: none;
  border-radius: 0px;

  transition: all 0.3s !important;
  .v-list {
    // background: rgba(0, 0, 0, 0.8) !important;
    background: var(--color) !important;
    // border-radius: 15px;
    border-radius: var(--borderRadius);
    // border: dashed 2px var(--v-accent-base);
    border: var(--border);

    .v-list-item > * {
      margin: 0;
      width: 100%;
      .v-btn {
        border-radius: 50px;
        width: 100%;
        color: var(--textColor) !important;
      }
    }
  }
}

#google {
  color: var(--v-secondary-base);
  // margin: 0 auto !important;
  .v-icon {
    margin-right: 10px;
    color: var(--v-accent-base);
  }
}
</style>
