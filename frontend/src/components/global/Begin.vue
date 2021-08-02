<template>
  <v-menu
    offset-y
    open-on-hover
    hide-on-scroll
    transition="scale-transition"
    origin="top center"
    attach="#begin"
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" id="begin">
        {{ $l("app.pages.begin") }}
      </div>
    </template>
    <v-list
      :style="
        `--color: ${color}; 
        --textColor: ${textColor}; 
        --borderRadius: ${borderRadius}; 
        --border: ${border}`
      "
    >
      <v-list-item>
        <GoogleSignIn>
          <v-btn text id="google">
            <img src="@/assets/icons/signIn/google.svg" alt="" />
            {{ $l("auth.google") }}
          </v-btn>
        </GoogleSignIn>
      </v-list-item>
      <v-list-item>
        <GoogleSignIn>
          <v-btn text id="facebook">
            <img src="@/assets/icons/signIn/facebook.svg" alt="" />
            {{ $l("auth.facebook") }}
          </v-btn>
        </GoogleSignIn>
        <!-- INSTEAD FACEBOOK SIGN IN !!!!!!!!!!!!!! -->
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
  box-shadow: none;
  border-radius: 0px;

  transition: all 0.3s !important;
  .v-list {
    background: var(--color) !important;
    border-radius: var(--borderRadius);
    border: var(--border);

    .v-list-item > * {
      margin: 0;
      width: 100%;
      .v-btn {
        border-radius: 50px;
        width: 100%;
        color: var(--textColor) !important;
        text-transform: none;
        img {
          margin-right: 10px;
          @include box-size(1.5rem);
          color: var(--v-accent-base);
        }
      }
    }
  }
}
</style>
