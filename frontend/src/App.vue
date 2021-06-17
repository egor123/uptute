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
:root {
  --side-margin: clamp(0.5rem, 18vw, 22rem);
}
html {
  scroll-behavior: smooth;
}
#app {
  // font-family: Comfortaa, Helvetica, Arial, sans-serif;
  font-family: Comfortaa;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--v-secondary-base);
  font-size: 1.1rem;

  a:not(.v-btn) {
    color: var(--v-secondary-darken3);
    &:hover,
    &:focus {
      color: var(--v-accent-darken2);
    }
  }
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: var(--v-secondary-darken2);
}
::-webkit-scrollbar-thumb {
  background: var(--v-secondary-darken4);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--v-primary-lighten5);
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
