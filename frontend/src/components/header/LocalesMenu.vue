<template>
  <HeaderMenu
    color="#000"
    textColor="var(--v-background-base)"
    borderRadius="0 0 15px 15px"
    border="none"
  >
    <template v-slot:title>
      <img :src="getImgUrl(locale)" :alt="locale" class="img" />
    </template>
    <template v-slot:content>
      <HeaderListItem
        @click="changeLocale(l)"
        v-for="(l, index) in otherLocales"
        :key="index"
        :img="getImgUrl(l)"
        alt="l"
      />
    </template>
  </HeaderMenu>
</template>

<script>
import HeaderMenu from "@/components/header/HeaderMenu.vue";
import HeaderListItem from "./HeaderListItem";

export default {
  components: {
    HeaderMenu,
    HeaderListItem,
  },
  data() {
    return {
      locales: ["en", "est"],
      locale: "",
    };
  },
  created() {
    this.locale = this.$route.params.locale;
  },
  computed: {
    otherLocales() {
      return this.locales.filter((l) => l !== this.locale);
    },
  },
  mounted() {
    for (const l of this.locales)
      if (require(`@/locales/${l}.json`).id !== l)
        throw new Error("Locale ID is not correct");
  },
  methods: {
    getImgUrl(locale) {
      return require("@/assets/icons/flags/" + locale + ".svg");
    },
    changeLocale(locale) {
      this.$router.replace({ params: { locale: locale } });
      this.locale = locale;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.img {
  $iconWidth: calc(30px * 0.845);
  @include hoverOpacity();
  border-radius: 1.5px;
  width: $iconWidth;
  margin: 0 calc((30px - #{$iconWidth}) / 2);
}
.v-list-item .img {
  cursor: pointer;
}
</style>

