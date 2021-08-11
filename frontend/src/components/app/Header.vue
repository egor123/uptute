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
            <img src="@/assets/logo.svg" id="logo" @click="goTo('Home')" />
          </button>
          <button @click="goTo('Home')">
            <h1 id="name">UpTute</h1>
          </button>
        </div>
        <!-- <div id="mobileSpacer" ref="mobileSpacer"></div> -->
        <div id="buttons" ref="buttons">
          <!-- <v-btn
            id="account"
            rounded
            v-if="!getStatus"
            :to="{ name: 'Account' }"
          > -->
          <!-- {{ $l("app.pages.account") }} -->

          <!-- </v-btn> -->
          <LessonMenu />
          <!-- <v-btn rounded v-if="!getStatus" :to="{ name: 'LogIn' }">
            {{ $l("app.pages.log_in") }}
          </v-btn>
          <v-btn rounded v-if="!getStatus" :to="{ name: 'Register' }">
            {{ $l("app.pages.register") }}
          </v-btn>

          <v-btn rounded :to="{ name: 'WhyUs' }">
            {{ $l("app.pages.why_us") }}
          </v-btn> -->

          <!-- <v-btn
            rounded
            text
            color="accent"
            v-if="!getStatus"
            :to="{ name: 'FindATutor' }"
          >
            {{ $l("app.pages.find_tutor") }}
          </v-btn> -->
          <Begin
            color="#000"
            textColor="white"
            borderRadius="0 0 15px 15px"
            border="none"
            v-if="getStatus"
          />
        </div>
        <v-menu
          offset-y
          open-on-hover
          hide-on-scroll
          transition="scale-transition"
          origin="top center"
          attach="#flag"
        >
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" id="flag" ref="locales">
              <img :src="getImgUrl(locale)" :alt="locale" class="flagImg" />
            </div>
          </template>
          <v-list>
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
        <v-icon
          id="account"
          ref="account"
          v-if="!getStatus"
          @click="goTo('Account')"
          >mdi-account-circle</v-icon
        >
      </div>
    </div>
    <div id="subHeader" ref="subHeader" />
    <v-snackbar
      max-width="800"
      color="error"
      timeout="15000"
      v-model="showSnackbar"
      content-class="errorSnackbar"
      bottom
      app
    >
      <p class="ma-0" v-html="$l('auth.allow_cookies')"></p>
    </v-snackbar>
    <Important />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import LessonMenu from "@/components/header/LessonMenu.vue";
import Begin from "@/components/header/Begin.vue";
import Important from "@/components/notifications/Important.vue";

export default {
  data() {
    return {
      minOffset: 100,
      locales: [],
      locale: String,
      showSnackbar: false,
    };
  },
  components: {
    LessonMenu,
    Begin,
    Important,
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
    goTo(pageName) {
      if (this.$route.name !== pageName) this.$router.push({ name: pageName });
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
      const account = this.$refs.account.$el;
      const navIcon = this.$refs.navIcon;

      const observer = new ResizeObserver(() => {
        buttons.style.display = "flex";

        var mv =
          container.offsetWidth -
            title.offsetWidth -
            locales.offsetWidth -
            account.offsetWidth -
            buttons.offsetWidth <
          this.minOffset;

        buttons.style.display = mv ? "none" : "flex";
        navIcon.style.display = mv ? "inline" : "none";
        container.classList.toggle("drawerActive", mv);
        this.setMobileView(mv);
      });
      observer.observe(document.documentElement);
      observer.observe(container);
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

      subHeader.classList.toggle("empty", true);
      new MutationObserver(() => {
        subHeader.classList.toggle("empty", subHeader.innerHTML === "");
      }).observe(subHeader, { childList: true });
      this.$root.$on("getSubHeader", (callback) => {
        callback(subHeader);
      });
      this.$root.$on("removeSubHeader", () => {
        subHeader.innerHTML = "";
      });
    },
  },
  created() {
    this.updateLocales(this.$route.params.locale);
  },
  mounted() {
    this.scroll();
    this.subHeader();
    this.$root.$on("cookiesError", () => (this.showSnackbar = true));
    setTimeout(() => {
      this.resize();
    }, 0);
  },
};
</script>
<style scoped lang="scss">
$header-height: 56px;
$gap: 1rem;
@import "@/scss/mixins.scss";

@mixin hoverOpacity() {
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
}

// @mixin flexbox() {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   height: 100%;
// }
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
    position: absolute;
    left: 0;
  }
  #container {
    @include flexbox();
    position: absolute;
    left: var(--side-margin);
    right: var(--side-margin);
    // left: 1rem;
    // right: 1rem;
    height: $header-height;

    @media (max-width: 1000px) {
      left: 1rem;
      right: 1rem;
      #account {
        margin: 0 0 0 calc(#{$gap} / 2);
        position: relative !important;
        right: 0 !important;
        transform: none !important;
      }
    }

    &.drawerActive {
      left: 55px;
    }

    #title {
      @include flexbox();
      text-transform: none;
      color: var(--v-background-base);
      margin-right: auto;
      #logo {
        height: 70px;
      }
      #name {
        font-size: 32px;
        color: var(--v-secondary-base);
        // font-weight: 500;
      }
      * {
        @include hoverOpacity();
      }
    }
    // #mobileSpacer {
    //   &.mobile {
    //     width: calc(1.4 * var(--side-margin));
    //     height: 1px;
    //     background: red;
    //   }
    // }
    #buttons {
      @include flexbox();
      margin-left: auto;

      // & > * {
      //   background-color: transparent;
      //   color: var(--v-background-darken3);
      //   color: var(--v-accent-base);
      //   padding: 0.5rem calc(#{$gap} / 2);
      //   letter-spacing: 3px;
      //   font-weight: 500;
      // }
      // * > div {
      //   color: var(--v-accent-base);
      // }
    }
    #flagBtn {
      height: 100%;
    }

    #nav a {
      margin: 2px;
      background-color: var(--v-primary-base);
      font-weight: bold;
      color: var(--v-secondary-base);
      &.router-link-active {
        color: var(--v-active-base);
      }
    }
    #account {
      position: absolute;
      font-size: 40px;
      color: var(--v-background-base);
      right: calc(50px - var(--side-margin));
      transform: translateX(50%);
      @include hoverOpacity();
      &.v-icon::after {
        background-color: transparent;
      }
    }
  }
}

::v-deep {
  #buttons {
    & > * {
      padding: calc(#{$gap} / 4) calc(#{$gap} / 2);
    }
  }
}

#flag {
  height: 100%;
  width: max-content;
  cursor: default;
  @include flexbox();
  padding: 0 calc(#{$gap} / 2);
}

.v-menu__content {
  background: transparent;
  border-radius: 0 0 15px 15px;
  transition: all 0.3s !important;
  .v-list {
    background: #000 !important;
    .v-list-item > * {
      margin: 0 auto;
    }
    .v-btn {
      border-radius: 50px;
    }
  }
}

.flagImg {
  border-radius: 1.5px;
}

::v-deep {
  .v-snack__wrapper {
    border-radius: 15px !important;
  }
  .v-btn__content {
    font-size: 1rem !important;
  }
}
#subHeader {
  z-index: -1;
  width: 100vw;
  opacity: 0.7;
  background-color: var(--v-header-base);
  padding: 10px 0;
  box-shadow: 0px 2px 6px var(--v-secondary-darken1);
  &.empty {
    display: none;
  }
}
</style>
