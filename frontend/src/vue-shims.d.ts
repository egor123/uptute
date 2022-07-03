import Vue from "vue";

declare module "*.vue" {
  export default Vue;
}

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
