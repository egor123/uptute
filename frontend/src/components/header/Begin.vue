<template>
  <!-- <v-menu
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
        INSTEAD FACEBOOK SIGN IN !!!!!!!!!!!!!!
      </v-list-item>
    </v-list>
  </v-menu> -->
  <HeaderMenu
    :color="color"
    :textColor="textColor"
    :borderRadius="borderRadius"
    :border="border"
  >
    <template v-slot:title>
      {{ $l("app.pages.begin") }}
    </template>
    <template v-slot:content>
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
    </template>
  </HeaderMenu>
</template>

<script>
import GoogleSignIn from "@/components/account/GoogleSignIn.vue";
import HeaderMenu from "@/components/header/HeaderMenu.vue";

export default {
  components: {
    GoogleSignIn,
    HeaderMenu,
  },
  props: {
    color: String,
    textColor: String,
    borderRadius: String,
    border: String,
  },
};
</script>
