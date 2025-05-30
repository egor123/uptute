<template>
  <div id="wrapper" ref="wrapper" scrollDist="30">
    <div id="header" ref="header" :style="`--gap: ${gap}`">
      <div ref="navIcon"><NavIcon /></div>
      <div ref="title"><HeaderTitle /></div>

      <v-spacer ref="spacer" />

      <div ref="rightSide" id="rightSide">
        <div v-if="roles.length == 0"><Account :ifWithText="!mv" /></div>
        <div v-if="roles.length > 0"><LessonMenu :ifWithText="!mv" /></div>

        <div><LocalesMenu /></div>
        <!-- <div><Notifications /></div> -->
        <div v-if="roles.length > 0"><AccountMenu /></div>
        <div><BalanceMenu /></div>
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
import { mapActions } from "vuex";
import LessonMenu from "@/components/header/LessonMenu.vue";
import Account from "@/components/header/Account.vue";
import LocalesMenu from "@/components/header/LocalesMenu.vue";
import AccountMenu from "@/components/header/AccountMenu.vue";
// import Notifications from "@/components/notifications/Notifications.vue";
import BalanceMenu from "@/components/header/balance/Menu.vue";
import HeaderTitle from "./Title.vue";
import NavIcon from "./NavIcon.vue";

export default {
  data() {
    return {
      showSnackbar: false,
      mv: false,
      spacerD: 0,
      gap: "0.6rem",
    };
  },
  components: {
    NavIcon,
    HeaderTitle,

    LessonMenu,
    Account,
    LocalesMenu,
    AccountMenu,

    // Notifications,
    BalanceMenu,
  },
  computed: {
    header() {
      return this.$refs.header;
    },
    buttons() {
      return this.$refs.buttons;
    },
    title() {
      return this.$refs.title;
    },
    navIcon() {
      return this.$refs.navIcon;
    },
    roles: function () {
      return this.$store.getters["auth/roles"];
    },
  },

  methods: {
    ...mapActions(["setMobileView"]),
    goTo(pageName) {
      if (this.$route.name !== pageName) this.$router.push({ name: pageName });
    },
    resized() {
      const spacer = this.$refs.spacer;
      const spacerWidth = spacer.getBoundingClientRect().width;
      const prevMv = this.mv;
      this.mv = spacerWidth < 100 + this.spacerD;
      if (prevMv != this.mv) setView(this, spacerWidth);
      function setView(self, prevSpacerWidth) {
        self.setStyles();
        setSpacerD();

        function setSpacerD() {
          self.$nextTick(() => {
            const spacerD =
              self.$refs.spacer.getBoundingClientRect().width - prevSpacerWidth;
            self.spacerD = spacerD > 0 ? spacerD : 0;
          });
        }
      }
    },
    setStyles() {
      this.title.style.display = this.mv ? "none" : "flex";
      this.navIcon.style.display = this.mv ? "inline" : "none";
      this.setMobileView(this.mv);
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
    addEventListener("resize", this.resized);
    this.$root.$on("cookiesError", () => (this.showSnackbar = true));
    this.subHeader();
    this.setStyles();
    this.scroll();

    document.onreadystatechange = () => {
      this.resized();
    };
  },
  beforeDestroy() {
    removeEventListener("resize", this.resized);
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

$header-height: 56px;

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
  @include box-shadow();

  @include flexbox();
  height: $header-height;
  width: 100%;
  padding: 0 1.4rem;
  background-color: var(--v-primary-base);
  opacity: 0.8;
  color: var(--v-secondary-base);

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

#rightSide {
  & > * {
    padding: 0 calc(var(--gap) / 2);
    height: 100%;
    @include flexbox();
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
