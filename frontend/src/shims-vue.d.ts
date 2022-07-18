declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

import Vue from "vue";

declare module "vue-animate-scroll";

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    path?: string;
    permisions?: {
      roles?: string[] | string;
      allowedOrigins?: string[] | string;
      redirect?: string;
    };
  }
}

