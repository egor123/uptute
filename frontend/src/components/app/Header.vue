<template>
  <div id="wrapper" ref="wrapper" scrollDist="30">
    <div id="header" ref="header">
      <!-- <div id="container" ref="container"> -->

      <div ref="navIcon" id="navIcon">
        <v-app-bar-nav-icon @click="setNavBar(!getNavBar)" />
      </div>

      <div id="title" ref="title">
        <button>
          <img src="@/assets/logo.svg" id="logo" @click="goTo('Home')" />
        </button>
        <button @click="goTo('Home')">
          <h1 id="name">UpTute</h1>
        </button>
      </div>

      <div ref="rightSide" id="rightSide">
        <div id="buttons" ref="buttons">
          <LessonMenu v-if="!getStatus" />

          <Begin
            color="#000"
            textColor="white"
            borderRadius="0 0 15px 15px"
            border="none"
            v-if="getStatus"
          />
        </div>
        <LocalesMenu />
        <Notifications />
        <AccountMenu />
      </div>
      <!-- </div> -->
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
      const header = this.$refs.header;
      const buttons = this.$refs.buttons;
      const title = this.$refs.title;
      const navIcon = this.$refs.navIcon;

      const observer = new ResizeObserver(() => {
        buttons.style.display = "flex";
        title.style.display = "flex";
        navIcon.style.display = "none";

        let pl = this.padding(header, "padding-left");
        let pr = this.padding(header, "padding-right");

        let emptySpace = Array.from(header.children).reduce(
          (val, el) => val - el.offsetWidth,
          header.offsetWidth - pl - pr
        );

        var mv = emptySpace < 0;

        buttons.style.display = mv ? "none" : "flex";
        title.style.display = mv ? "none" : "flex";
        navIcon.style.display = mv ? "inline" : "none";

        this.setMobileView(mv);
      });
      observer.observe(document.documentElement); //needed for observe on mounted
      observer.observe(header);
    },
    padding(header, side) {
      var pPx = window.getComputedStyle(header, null).getPropertyValue(side);
      return pPx.slice(0, pPx.length - 2);
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
  $gap: 1rem !important;
  @include box-shadow();

  @include flexbox();
  height: $header-height;
  width: 100%;
  padding: 0 1.4rem;
  background-color: var(--v-primary-base);
  opacity: 0.8;
  color: var(--v-secondary-base);
  #navIcon {
    padding: $gap / 2;

    position: absolute;
    left: 10px;
    .v-btn {
      color: var(--v-accent-base) !important;
    }
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
    }
    * {
      @include hoverOpacity();
    }
  }

  #buttons {
    height: 100%;
    @include flexbox();
    padding: 0 2rem 0 2rem;
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
    @include flexbox();
    width: fit-content;
    height: 100%;
    margin-left: auto;
    transform: none !important;
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
