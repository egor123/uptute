import Vue from "vue";

import MobileInput from "./mobileInput";
import Locale from "./locale";
import PopUp from "./popUp";

declare module "vue/types/vue" {
  interface Vue {
    $mb: MobileInput;
    $l: Locale;
    $pop: PopUp;
  }
}

export {};
