<template>
  <div id="wrapper" ref="wrapper" scrollDist="30">
    <div id="header">
      <div id="container" ref="container">
        <div id="title" ref="title">
          <button>
            <img src="@/assets/logo.svg" id="logo" @click="goTo('Home')" />
          </button>
          <button @click="goTo('Home')">
            <h1 id="name">UpTute</h1>
          </button>
        </div>
        <div ref="navIcon" id="navIcon">
          <v-app-bar-nav-icon @click="setNavBar(!getNavBar)" />
        </div>
        <div id="buttons" ref="buttons">
          <LessonMenu v-if="getStatus" />

          <Begin
            color="#000"
            textColor="white"
            borderRadius="0 0 15px 15px"
            border="none"
            v-if="!getStatus"
          />
        </div>

        <div v-if="!getStatus" ref="rightSide" id="rightSide">
          <LocalesMenu />
          <Notifications />
          <AccountMenu />
        </div>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LessonMenu from "@/components/header/LessonMenu.vue";
import Begin from "@/components/header/Begin.vue";
import LocalesMenu from "@/components/header/LocalesMenu.vue";
import AccountMenu from "@/components/header/AccountMenu.vue";

import Notifications from "@/components/notifications/Notifications.vue";

export default {
  data() {
    return {
      minOffset: 100,
      showSnackbar: false,
    };
  },
  components: {
    LessonMenu,
    Begin,
    LocalesMenu,
    AccountMenu,

    Notifications,
  },
  computed: mapGetters(["getStatus", "getNavBar"]),
  methods: {
    ...mapActions(["setMobileView", "setNavBar"]),
    goTo(pageName) {
      if (this.$route.name !== pageName) this.$router.push({ name: pageName });
    },
    resize() {
      const container = this.$refs.container;
      const buttons = this.$refs.buttons;
      const title = this.$refs.title;
      // const rightSide = this.$refs.rightSide;
      const navIcon = this.$refs.navIcon;

      const observer = new ResizeObserver(() => {
        buttons.style.display = "flex";
        title.style.display = "flex";
        navIcon.style.display = "none";
        let emptySpace = Array.from(container.children).reduce(
          (val, el) => val - el.offsetWidth,
          container.offsetWidth
        );
        console.log(emptySpace);
        var mv = emptySpace < 0;
        console.log(mv);
        buttons.style.display = mv ? "none" : "flex";
        title.style.display = mv ? "none" : "flex";
        navIcon.style.display = mv ? "inline" : "none";

        // var mv =
        //   container.offsetWidth - title.offsetWidth - rightSide.offsetWidth <
        //   this.minOffset;

        // buttons.style.display = mv ? "none" : "flex";
        // title.style.display = mv ? "none" : "flex";
        // navIcon.style.display = mv ? "inline" : "none";

        // container.classList.toggle("drawerActive", mv);
        // this.setMobileView(mv);
      });
      // observer.observe(document.documentElement);
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
$gap: 0.6rem;
@import "@/scss/mixins.scss";

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
    .v-btn {
      color: var(--v-accent-base) !important;
    }
  }
  #container {
    @include flexbox();
    position: absolute;
    left: var(--side-margin);
    right: var(--side-margin);
    height: $header-height;
    background: red;
    @media (max-width: 1200px) {
      left: 1rem;
      right: 1rem;
      $gap: 3rem !important;
      #rightSide {
        @include box-size(fit-content);
        position: relative !important;
        right: 0 !important;
        transform: none !important;
      }
    }

    &.drawerActive {
      left: 55px;
      // #title {
      //   opacity: 0;
      //   pointer-events: none;
      // }
    }

    #title {
      @include flexbox();
      text-transform: none;
      color: var(--v-background-base);
      margin-right: auto;
      // position: absolute;
      // left: calc(-1 * var(--side-margin));
      #logo {
        height: 70px;
      }
      #name {
        font-size: 32px;
        color: var(--v-secondary-base);
      }
      * {
        @include hoverOpacity();
      }
    }

    #buttons {
      height: 100%;
      @include flexbox();
      padding: 0 2rem;
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
    #rightSide {
      height: 100%;
      @include flexbox();
      position: absolute;
      right: calc(1.5rem - var(--side-margin));
      // transform: translateX(100%);
    }
  }
}

::v-deep {
  .headerCircle {
    $circleSize: 35px;
    &.v-icon {
      font-size: $circleSize;
    }
    &.img {
      $imgSize: $circleSize * 0.845;
      width: $imgSize !important;
      margin: 0 ($circleSize - $imgSize) / 2 !important;
    }
  }

  #buttons > *,
  #rightSide {
    & > * {
      padding: 0 calc(#{$gap} / 2);
    }
    min-width: max-content;
  }
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
