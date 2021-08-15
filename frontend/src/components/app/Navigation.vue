<template>
  <v-navigation-drawer v-if="isMobileView" id="nav" v-model="value" clipped app>
    <v-card flat id="card">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-icon class="ma-0 logoContainer">
            <img id="logo" src="@/assets/logo.svg" alt="logo" />
          </v-list-item-icon>
        </v-list-item-content>
      </v-list-item>

      <div class="dividor" />

      <div id="signInOuter">
        Sign in
        <div id="signIn">
          <GoogleSignIn>
            <img id="google" src="@/assets/icons/signIn/google.svg" alt="" />
          </GoogleSignIn>
          <GoogleSignIn>
            <img
              id="facebook"
              src="@/assets/icons/signIn/facebook.svg"
              alt=""
            />
          </GoogleSignIn>
          <!-- INSTEAD FACEBOOK SIGN IN !!!!!!!!!!!!!! -->
        </div>
      </div>

      <div class="dividor" />

      <v-list class="pr-0 buttonsList" flat dense nav>
        <v-list-item-group active-class="chosenPage">
          <v-list-item
            exact
            active-class="active"
            class=".button"
            :to="{ name: 'Home' }"
          >
            {{ $l("app.pages.home") }}
          </v-list-item>

          <!-- <v-list-item link active-class="active" :to="{ name: 'WhyUs' }">
            {{ $l("app.pages.why_us") }}
          </v-list-item>
          <v-list-item link active-class="active" :to="{ name: 'LogIn' }">
            {{ $l("app.pages.log_in") }}
          </v-list-item>
          <v-list-item link active-class="active" :to="{ name: 'Register' }">
            {{ $l("app.pages.register") }}
          </v-list-item> -->
          <!-- <v-list-item link active-class="active" :to="{ name: 'FindATutor' }">
            {{ $l("app.pages.find_tutor") }}
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GoogleSignIn from "@/components/account/GoogleSignIn.vue";

export default {
  data() {
    return {
      value: false,
    };
  },
  components: {
    GoogleSignIn,
  },
  watch: {
    value: function(val) {
      this.setNavBar(val);
    },
    getNavBar: function(val) {
      this.value = val;
    },
  },
  computed: mapGetters(["getStatus", "getNavBar", "isMobileView"]),
  methods: mapActions(["setNavBar"]),
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#card,
#nav {
  background: var(--v-background-base);
}

#nav {
  z-index: 101;
}

.logoContainer {
  justify-content: center;
}

#logo {
  animation: logoPendulum 1.2s infinite ease-in-out alternate;
  height: 70px;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
}

@keyframes logoPendulum {
  from {
    transform: translateX(-0.4rem) rotate(-6deg);
  }
  to {
    transform: translateX(0.4rem) rotate(6deg);
  }
}

#signInOuter {
  @include flexbox();
  // position: relative;
  justify-content: center;
  padding: 1.5rem 1rem;
  color: var(--v-secondary-darken3);
  #signIn {
    @include flexbox();
    // justify-content: space-evenly;
    // position: absolute;
    // left: 50%;
    // transform: translateX(-50%);
    #google,
    #facebook {
      @include flexbox();
      margin-left: 16px;

      @include box-size(30px);
    }
  }
}

.v-list {
  padding: 1.5rem 0.5rem;
  .buttonsList .v-list-item {
    border-radius: 5px 0 0 5px !important;
    &.active {
      color: var(--v-secondary-darken3) !important;
      background: var(--v-secondary-darken1) !important;
    }

    &:not(.active) {
      color: var(--v-secondary-darken3) !important;
      // background: var(--v-background-base) !important;
      // border: 1px dotted var(--v-secondary-darken1);
    }
  }
}
.buttonsList .v-list-item {
  border-radius: 5px 0 0 5px !important;
  &.active {
    color: var(--v-secondary-darken3) !important;
    background: var(--v-secondary-darken1) !important;
  }

  &:not(.active) {
    color: var(--v-secondary-darken3) !important;
    // background: var(--v-background-base) !important;
    // border: 1px dotted var(--v-secondary-darken1);
  }
}
</style>
