<template>
  <div id="main">
    <div id="footer" ref="footer">
      <div id="footer-wrapper" ref="wrapper">
        <div id="container">
          <div id="container-text">
            <h3>{{ $l("app.footer.pages_title") }}</h3>
            <ul>
              <li v-for="page in pages" :key="page.index">
                <router-link class="link" :to="{ name: page.route }">
                  {{ $l("app.pages." + page.name) }}
                </router-link>
              </li>
            </ul>
          </div>
          <h2 id="container-header">UpTute</h2>
          <div id="container-icons">
            <v-btn
              v-for="icon in icons"
              :key="icon.index"
              icon
              :href="icon.link"
            >
              <v-icon size="24px" class="icon">
                {{ icon.img }}
              </v-icon>
            </v-btn>
          </div>
          <div id="container-reference">
            Icons made by
            <a href="https://www.freepik.com" title="Freepik">
              Freepik
            </a>
            from
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
          <p id="container-uptute">
            &#169; UpTute {{ new Date().getFullYear() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      icons: [
        {
          img: "mdi-facebook",
          link: "https://www.facebook.com/UpTute-100775658754801",
        },
        {
          img: "mdi-instagram",
          link: "https://www.instagram.com/_uptute_/",
        },
      ],
      pages: [
        { name: "home", route: "Home" },
        { name: "terms", route: "TermsOfUse" },
        { name: "privacy_policy", route: "PrivacyPolicy" },
      ],
    };
  },
  computed: mapGetters(["getStatus"]),

  async mounted() {
    const footer = this.$refs.footer;
    const wrapper = this.$refs.wrapper;
    new ResizeObserver(() => {
      footer.style.height = wrapper.offsetHeight + "px";
    }).observe(wrapper);
  },
  beforeMount() {
    // if (!this.getStatus) {
    //   this.pages.splice(1, 0, { name: "register", route: "Register" });
    // } else {

    // }
    this.pages.splice(1, 0, { name: "find_tutor", route: "FindATutor" });
  },
  // methods: {
  //   scrollToBottom() {
  //     window.scrollTo({ top: document.body.scrollHeight });
  //   },
  // },
};
</script>

<style scoped lang="scss">
#footer {
  background-color: var(--v-primary-lighten1);
  color: var(--v-secondary-base);
  width: 100vw;
  position: absolute;
  clip: rect(0, auto, auto, 0);
}
#footer-wrapper {
  position: fixed;
  width: 100%;
  height: fit-content;
  bottom: 0;
}
#container-uptute {
  font-size: 1rem;
  margin-top: 1rem;
}
#container-text {
  text-align: left;
  .link {
    text-decoration: none;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
}
#container-icons {
  text-align: right;
}

#container {
  margin: 1rem var(--side-margin) 0;
  display: grid;
  gap: 2ch;
  grid-auto-columns: 1fr;
  grid-template-areas:
    "text header icons"
    "reference reference reference"
    "uptute uptute uptute";
  @media (max-width: 750px) {
    grid-template-areas:
      "header"
      "text"
      "icons"
      "reference"
      "uptute";
    &-text {
      justify-self: center;
      text-align: center;
    }
    &-text h3,
    &-icons {
      text-align: center;
    }
  }
  @each $child in uptute, text, icons, reference, header {
    &-#{$child} {
      grid-area: $child;
    }
  }
}

.icon {
  color: var(--v-accent-base) !important;
  &:hover {
    color: var(--v-accentHover-darken1) !important;
  }
}
</style>
