import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#000000",
        secondary: "#FFFFFF",
        background: "EFEFEF",
        header: "#F8F8F8",
        accent: "#FFA500",
      },
    },
  },
});
