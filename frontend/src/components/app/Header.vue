<template>
  <v-app-bar clipped-left app id="nav">
    <div id="container">
      <v-btn width="190" depressed rounded id="title" @click="goToHomePage()">
        <img width="70px" height="70px" src="@/assets/logo.svg" id="logo" />
        <h1 id="name">UpTute</h1>
      </v-btn>
      <div id="buttons">
        <v-btn rounded :to="{ name: 'WhyUs' }" v-if="!isMobileView">
          {{ $l("app.pages.why_us") }}
        </v-btn>
        <v-btn
          rounded
          v-if="!getStatus && !isMobileView"
          :to="{ name: 'LogIn' }"
        >
          {{ $l("app.pages.log_in") }}
        </v-btn>
        <v-btn
          rounded
          v-if="!getStatus && !isMobileView"
          :to="{ name: 'Register' }"
        >
          {{ $l("app.pages.register") }}
        </v-btn>
        <v-btn
          rounded
          v-if="getStatus && !isMobileView"
          :to="{ name: 'Account' }"
        >
          {{ $l("app.pages.account") }}
        </v-btn>
        <v-btn
          rounded
          color="accent"
          v-if="!getStatus && !isMobileView"
          :to="{ name: 'FindATutor' }"
        >
          {{ $l("app.pages.find_tutor") }}
        </v-btn>
        <div id="locales">
          <v-select
            v-on:change="changeLocale"
            :items="locales"
            v-model="$route.params.locale"
            append-icon="mdi-translate"
            background-color="accent"
            rounded
            hide-details
            hide-selected
            height="35"
          />
        </div>
      </div>
    </div>
    <v-app-bar-nav-icon
      id="navbar-icon"
      color="accent"
      @click="drawer = !drawer"
      v-if="isMobileView"
    />
  </v-app-bar>
</template>
<script>
export default {
  props: ["value", "isMobileView"],
  data() {
    return {
      locales: [],
      locale: String,
      getStatus: false,
      d: this.value,
    };
  },
  watch: {
    value: function (val) {
      this.drawer = val;
    },
  },
  computed: {
    drawer: {
      set: function (val) {
        this.d = val;
        this.$emit("input", val);
      },
      get: function () {
        return this.d;
      },
    },
  },
  methods: {
    changeLocale(val) {
      this.$router.replace({
        params: { locale: val },
      });
    },
    goToHomePage() {
      if (this.$route.name !== "Home") this.$router.push({ name: "Home" });
    },
  },
  created() {
    this.locales = require.context("@/locales", true, /^.*\.json$/).keys();
    for (var i = 0; i < this.locales.length; i++)
      this.locales[i] = this.locales[i].slice(2, -5);
    this.locale = this.$route.params.locale;
  },
};
</script>
<style scoped lang="scss">
#nav {
  background-color: var(--v-primary-base);
  opacity: 0.8;
  color: var(--v-secondary-base);
  padding: 0;
  margin: 0;
  z-index: 100;
}

#container {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  left: 0;
  justify-content: space-between;
  padding: 0 var(--side-margin);
}

#title {
  text-transform: none;
  background-color: transparent;
  color: var(--v-secondary-base);
  #icon {
    margin: 0px;
  }
  #name {
    font-size: 32px;
  }
}
#buttons {
  display: flex;
  align-items: center;
  #locales {
    width: 125px;
  }
}

#nav a {
  margin: 2px;
  background-color: var(--v-primary-base);
  font-weight: bold;
  color: var(--v-secondary-base);
}

#nav a.router-link-active {
  color: var(--v-active-base);
}
</style>