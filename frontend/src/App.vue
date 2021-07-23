<template>
  <v-app>
    <Navigation />
    <Header />
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "@/components/app/Header";
import Footer from "@/components/app/Footer";
import Navigation from "@/components/app/Navigation";

export default {
  data: () => ({
    drawer: false,
  }),
  components: {
    Header,
    Footer,
    Navigation,
  },
  computed: mapGetters(["getStatus"]),
  methods: {
    ...mapActions(["isAuth"]),
  },
};
</script>

<style lang="scss">
@import "./scss/styles.scss";
@import "./scss/mixins.scss";

@font-face {
  font-family: "Comfortaa";
  src: url(//fonts.googleapis.com/css?family=Comfortaa);
  font-weight: normal;
  font-style: normal;
  text-decoration: none;
}

:root {
  --side-margin: clamp(0.5rem, 18vw, 22rem);
}

html {
  scroll-behavior: smooth;
  @include font-size();
  body {
    height: 100%;
  }
  p,
  h3,
  div,
  span {
    font-size: 1rem;
  }
  span.v-btn__content {
    font-size: 0.9rem;
  }
  h2 {
    font-size: 1.6rem;
  }
  h1 {
    font-size: 2rem;
    color: var(--v-accent-base);
  }
  h3,
  h2,
  h1 {
    font-weight: 800;
  }
}

#app {
  font-family: Comfortaa;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--v-secondary-base);
  font-size: 1.1rem;

  a:not(.v-btn) {
    color: var(--v-secondary-darken3);
    transition: color 400ms;
    &:hover,
    &:focus {
      color: var(--v-accent-darken2);
    }
  }
}
::-webkit-scrollbar {
  width: 12px;
}
::-webkit-scrollbar-track {
  background: var(--v-background-base);
}
::-webkit-scrollbar-thumb {
  background-color: var(--v-secondary-darken3);
  border-radius: 15px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: var(--v-secondary-darken4);
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
