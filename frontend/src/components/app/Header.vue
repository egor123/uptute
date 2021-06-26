<template>
  <div id="wrapper" ref="wrapper" scrollDist="30">
    <div id="header">
      <div ref="navIcon" id="navIcon">
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
            text
            color="accent"
            v-if="!getStatus"
            :to="{ name: 'FindATutor' }"
          >
            {{ $l("app.pages.find_tutor") }}
          </v-btn>
        </div>
        <div id="locales" ref="locales">
          <v-menu offset-y open-on-hover hide-on-scroll attach="#locales">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="ma-0"
                width="10px"
              >
                <img :src="getImgUrl(locale)" :alt="locale" class="flagImg" />
              </v-btn>
            </template>
            <v-list class="languageList mt-6">
              <v-list-item
                v-for="(l, index) in locales"
                :key="index"
                v-on:change="changeLocale(l)"
              >
                <button>
                  <img :src="getImgUrl(l)" :alt="l" class="flagImg" />
                </button>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
    <div id="subHeader" ref="subHeader" />
  </div>
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
      this.resize();
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
    resize() {
      const container = this.$refs.container;
      const buttons = this.$refs.buttons;
      const title = this.$refs.title;
      const locales = this.$refs.locales;
      const navIcon = this.$refs.navIcon;

      new ResizeObserver(() => {
        buttons.style.display = "flex";
        var mv =
          container.offsetWidth - title.offsetWidth - locales.offsetWidth <
          buttons.offsetWidth;
        buttons.style.display = mv ? "none" : "flex";
        navIcon.style.display = mv ? "inline" : "none";
        this.setMobileView(mv);
      }).observe(document.documentElement);
    },
    scroll() {
      const wrapper = this.$refs.wrapper;
      var hidden = false;
      var currentOffsetY = window.pageYOffset;
      var lastOffsetY = currentOffsetY;
      window.onscroll = () => {
        currentOffsetY = window.pageYOffset;
        var scroll = currentOffsetY - lastOffsetY;
        if (scroll >= 0 == hidden) lastOffsetY = currentOffsetY;
        else if (Math.abs(scroll) > wrapper.getAttribute("scrollDist"))
          hidden = !hidden;
        wrapper.classList.toggle("hide", hidden);
      };
    },
    subHeader() {
      const subHeader = this.$refs.subHeader;
      this.$root.$on("setSubHeader", (val) => {
        subHeader.innerHTML = val;
        subHeader.classList.toggle("notBlank", val !== "");
      });
    },
  },
  created() {
    this.updateLocales(this.$route.params.locale);
  },
  mounted() {
    this.resize();
    this.scroll();
    this.subHeader();
  },
};
</script>
<style scoped lang="scss">
$header-height: 56px;

@mixin flexbox() {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
#wrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100vw;
  z-index: 100;
  transition: transform 0.25s ease-out;
  &.hide {
    transform: translateY(-$header-height);
  }
}
#header {
  @include flexbox();
  height: $header-height;
  width: 100%;
  background-color: var(--v-primary-base);
  opacity: 0.8;
  color: var(--v-secondary-base);
  #navIcon {
    padding: 1rem;
  }
  #container {
    @include flexbox();
    position: absolute;
    left: var(--side-margin);
    right: var(--side-margin);
    #title {
      @include flexbox();
      text-transform: none;
      background-color: transparent;
      color: var(--v-secondary-darken2);
      #logo {
        height: 70px;
      }
      #name {
        font-size: 32px;
        color: var(--v-secondary-base);
      }
      & > * {
        transition: opacity 0.3s ease-in-out;
      }
      & > *:hover {
        opacity: 0.7;
      }
    }
    #buttons {
      @include flexbox();
      margin-left: auto;
      * {
        background-color: inherit;
        color: var(--secondary-base);
        margin-right: 0.5rem;
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
    .languageList {
      background-color: #00000033 !important;
    }
    .listItem {
      padding: 0;
    }
  }
}
#subHeader {
  z-index: -1;
  width: 100vw;
  opacity: 0.7;
  background-color: var(--v-header-base);
  padding: 0;
  box-shadow: 0px 2px 6px var(--v-secondary-darken1);
  &.notBlank {
    padding: 10px;
  }
}

.flagImg {
  border-radius: 1.5px;
}
</style>
