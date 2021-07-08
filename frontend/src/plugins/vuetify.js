import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#000000",
        secondary: "#FFFFFF",
        background: "EFEFEF",
        card: "EBEBEB",
        header: "#F8F8F8",
        accent: "#FFA500",
        accentHover: "#FF8C00",
        error: "#ef5350",
      },
    },
  },
});
