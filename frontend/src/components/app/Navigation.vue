<template>
  <v-navigation-drawer
    v-if="isMobileView"
    id="nav"
    v-model="value"
    clipped
    app
    color="header"
  >
    <v-card>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <h2 id="title">UpTute</h2>
          </v-list-item-title>
          <v-list-item-subtitle
            ><h3 id="title">Fresh. Fast. Friendly.</h3></v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list dense nav>
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
    value: function (val) {
      this.setNavBar(val);
    },
    getNavBar: function (val) {
      this.value = val;
    },
  },
  computed: mapGetters(["getStatus", "getNavBar", "isMobileView"]),
  methods: mapActions(["setNavBar"]),
};
</script>

<style scoped>
#nav {
  z-index: 101;
}
#title {
  color: var(--v-accent-base);
}
</style>