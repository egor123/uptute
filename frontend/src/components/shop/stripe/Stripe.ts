import { loadStripe } from "@stripe/stripe-js/pure";
import { vm } from "@/main";

const key = process.env.VUE_APP_PUBLISHABLE_KEY;
if (!key) throw new Error(`Stripe's publishable key is ${key}`);

export class MyStripe {
  public static get = () => (key ? loadStripe(key) : null);

  public static get locale() {
    switch (vm.$route.params.locale) {
      case "en":
        return "en";
      case "est":
        return "et";
      default:
        throw new Error(`Locale ${vm.$route.params.locale} is not supported`);
    }
  }
}
