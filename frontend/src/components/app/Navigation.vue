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

      <v-list class="pr-0" flat dense nav>
        <v-list-item-group active-class="chosenPage">
          <v-list-item exact link :to="{ name: 'Home' }">
            {{ $l("app.pages.home") }}
          </v-list-item>
          <v-list-item link :to="{ name: 'WhyUs' }">
            {{ $l("app.pages.why_us") }}
          </v-list-item>
          <v-list-item link :to="{ name: 'LogIn' }">
            {{ $l("app.pages.log_in") }}
          </v-list-item>
          <v-list-item link :to="{ name: 'Register' }">
            {{ $l("app.pages.register") }}
          </v-list-item>
          <v-list-item link :to="{ name: 'FindATutor' }">
            {{ $l("app.pages.find_tutor") }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      value: false,
    };
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
$drawer-background: #fafafa;
#card,
#nav {
  background: $drawer-background;
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

.chosenPage {
  background: var(--v-secondary-darken1);
  border-radius: 5px 0 0 5px;
}

.chosenPage:focus {
  background: var(--v-secondary-darken1) !important;
  border-radius: 5px 0 0 5px !important;
}
</style>
