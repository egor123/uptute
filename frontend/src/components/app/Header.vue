<template>
  <v-app-bar clipped-left app id="nav" hide-on-scroll>
    <div id="container">
      <v-row id="title" class="align-center flex-nowrap">
        <button>
          <img src="@/assets/logo.svg" id="logo" @click="goToHomePage()" />
        </button>
        <button @click="goToHomePage()">
          <h1 id="name">UpTute</h1>
        </button>
      </v-row>

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
          class="orangeBack"
          v-if="!getStatus && !isMobileView"
          :to="{ name: 'FindATutor' }"
        >
          {{ $l("app.pages.find_tutor") }}
        </v-btn>
        <div id="locales">
          <v-menu offset-y open-on-hover hide-on-scroll>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="ml-4"
                width="10px"
              >
                <img
                  :src="getImgUrl(locale)"
                  :alt="locale"
                  class="flagImg"
                  width="24"
                  height="16"
                />
              </v-btn>
            </template>
            <v-list class="languageList mt-6 px-0">
              <v-list-item
                v-for="(l, index) in locales"
                :key="index"
                v-on:change="changeLocale(l)"
              >
                <button class="justCenter">
                  <img
                    :src="getImgUrl(l)"
                    :alt="l"
                    class="flagImg"
                    width="24"
                    height="16"
                  />
                </button>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- <v-select
            class="ml-0"
            v-on:change="changeLocale"
            :items="locales"
            v-model="$route.params.locale"
            append-icon="mdi-translate"
            background-color="accent"
            rounded
            hide-details
            hide-selected
            height="35"
          /> -->
        </div>
      </div>
    </div>
    <v-app-bar-nav-icon
      id="navbar-icon"
      color="secondary darken-4"
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
    value: function(val) {
      this.drawer = val;
    },
  },
  computed: {
    drawer: {
      set: function(val) {
        this.d = val;
        this.$emit("input", val);
      },
      get: function() {
        return this.d;
      },
    },
  },
  methods: {
    changeLocale(val) {
      this.$router.replace({
        params: { locale: val },
      });
      this.updateLocales(val);
    },
    goToHomePage() {
      if (this.$route.name !== "Home") this.$router.push({ name: "Home" });
    },
    getImgUrl(locale) {
      return require("@/assets/icons/flags/" + locale + ".png");
    },
    updateLocales(locale) {
      this.locale = locale;
      this.locales = require.context("@/locales", true, /^.*\.json$/).keys();
      for (var i = 0; i < this.locales.length; i++)
        this.locales[i] = this.locales[i].slice(2, -5);
      this.locales.splice(this.locales.indexOf(locale), 1);
    },
  },
  created() {
    this.updateLocales(this.$route.params.locale);
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
  color: var(--v-secondary-darken2);
  #logo {
    margin: 0px;
    width: 70px;
    height: 70px;
    transition: all 500ms;
  }
  #logo:hover {
    margin: 0px;
    transform: rotate(360deg);
  }
  #name {
    font-size: 32px;
    color: var(--v-secondary-base);
  }
  #name:hover {
    color: var(--v-secondary-darken1);
  }
}
#buttons {
  display: flex;
  align-items: center;
  #locales {
    width: content;
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

.justCenter {
  margin-left: auto;
  margin-right: auto;
}

.flagImg {
  border-radius: 2px;
}

.languageList {
  background-color: #00000033 !important;
}

.listItem {
  padding: 0rem;
}
</style>
