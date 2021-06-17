<template>
  <v-app-bar clipped-left app id="nav" hide-on-scroll>
    <!-- {{getNavBar() == true}} -->

    <div ref="navIcon">
      <v-app-bar-nav-icon
        color="secondary darken-4"
        @click="setNavBar(!getNavBar)"
      />
    </div>
    <div id="container" ref="container">
      <div id="title" ref="title">
        <button>
          <img src="@/assets/logo.svg" id="logo" @click="goToHomePage()" />
        </button>
        <button @click="goToHomePage()">
          <h1 id="name">UpTute</h1>
        </button>
      </div>
      <div id="buttons" ref="buttons">
        <v-btn rounded :to="{ name: 'WhyUs' }">
          {{ $l("app.pages.why_us") }}
        </v-btn>
        <v-btn rounded v-if="!getStatus" :to="{ name: 'LogIn' }">
          {{ $l("app.pages.log_in") }}
        </v-btn>
        <v-btn rounded v-if="!getStatus" :to="{ name: 'Register' }">
          {{ $l("app.pages.register") }}
        </v-btn>
        <v-btn rounded v-if="getStatus" :to="{ name: 'Account' }">
          {{ $l("app.pages.account") }}
        </v-btn>
        <v-btn
          rounded
          color="accent"
          v-if="!getStatus"
          :to="{ name: 'FindATutor' }"
        >
          {{ $l("app.pages.find_tutor") }}
        </v-btn>
      </div>
      <div id="locales" ref="locales">
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" color="secondary" class="ml-4">
              <img :src="getImgUrl(locale)" :alt="locale" class="flagImg" />
            </v-btn>
          </template>
          <v-list class="languageList mt-6">
            <v-list-item
              v-for="(l, index) in locales"
              :key="index"
              v-on:change="changeLocale(l)"
            >
              <button class="justCenter">
                <img :src="getImgUrl(l)" :alt="l" class="flagImg" />
              </button>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      locales: [],
      locale: String,
    };
  },
  computed: mapGetters(["getStatus", "getNavBar"]),
  methods: {
    ...mapActions(["setMobileView", "setNavBar"]),
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
      return require("@/assets/icons/flags/" + locale + ".svg");
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
  mounted() {
    const container = this.$refs.container;
    const buttons = this.$refs.buttons;
    const title = this.$refs.title;
    const locales = this.$refs.locales;
    const navIcon = this.$refs.navIcon;
    new ResizeObserver(() => {
      buttons.style.display = "flex";
      const mv =
        container.offsetWidth - title.offsetWidth - locales.offsetWidth <
        buttons.offsetWidth;
      buttons.style.display = mv ? "none" : "flex";
      navIcon.style.display = mv ? "inline" : "none";
      this.setMobileView(mv);
    }).observe(container);
  },
};
</script>
<style scoped lang="scss">
@mixin flexbox() {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

#nav {
  background-color: var(--v-primary-base);
  opacity: 0.8;
  color: var(--v-secondary-base);
  z-index: 100;
}

#container {
  @include flexbox();
  position: absolute;
  left: var(--side-margin);
  right: var(--side-margin);
}

#title {
  @include flexbox();
  text-transform: none;
  background-color: transparent;
  color: var(--v-secondary-darken2);
  #logo {
    height: 70px;
    transition: transform 0.6s ease-in-out;
    &:hover {
      transform: rotate(360deg);
    }
  }
  #name {
    font-size: 32px;
    color: var(--v-secondary-base);
    &:hover {
      color: var(--v-secondary-darken1);
    }
  }
}
#buttons {
  @include flexbox();
  margin-left: auto;
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
// .flagImg {
//   border-radius: 2px;
// }

.languageList {
  background-color: #00000033 !important;
}
</style>
