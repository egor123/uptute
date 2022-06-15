import Vue from "vue";

import MobileInput from "./mobileInput";
import Locale from "./locale";

declare module "vue/types/vue" {
  interface Vue {
    $mb: MobileInput;
    $l: Locale;
  }
}

export {};
