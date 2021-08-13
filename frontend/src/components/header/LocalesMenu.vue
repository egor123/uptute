<template>
  <HeaderMenu
    color="#000"
    textColor="var(--v-background-base)"
    borderRadius="0 0 15px 15px"
    border="none"
  >
    <template v-slot:title>
      <img :src="getImgUrl(locale)" :alt="locale" class="flagImg" />
    </template>
    <template v-slot:content>
      <v-list-item
        v-for="(l, index) in locales"
        :key="index"
        v-on:change="changeLocale(l)"
      >
        <button>
          <img :src="getImgUrl(l)" :alt="l" class="flagImg" />
        </button>
      </v-list-item>
    </template>
  </HeaderMenu>
</template>

<script>
import HeaderMenu from "@/components/header/HeaderMenu.vue";

export default {
  components: {
    HeaderMenu,
  },
  data() {
    return {
      locales: [],
      locale: "",
    };
  },
  created() {
    this.updateLocales(this.$route.params.locale);
  },
  methods: {
    getImgUrl(locale) {
      return require("@/assets/icons/flags/" + locale + ".svg");
    },
    changeLocale(val) {
      this.$router.replace({
        params: { locale: val },
      });
      this.updateLocales(val);
    },
    updateLocales(locale) {
      this.locale = locale;
      let locales = require.context("@/locales", true, /^.*\.json$/).keys();
      locales = locales.map((l) => l.slice(2, -5));
      locales.splice(locales.indexOf(locale), 1);
      this.locales = locales;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.flagImg {
  border-radius: 1.5px;
}
</style>
