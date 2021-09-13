<template>
  <button id="payButton" @click="redirect">Pay</button>
</template>

<script>
// import { loadStripe } from "@stripe/stripe-js";
// import { onMounted } from "vue";

export default {
  data() {
    return {
      stripe: null,
    };
  },
  created() {
    const key = process.env.VUE_APP_PUBLISHABLE_KEY;
    console.log(key);
    this.stripe = Stripe(
      // "pk_test_51ITQGGGR1ZOj2dmhE9k2XU35NGtYO4XaFxZBg76Qm0wNddyRnIvnqnsi8BIJRioPDZozrXNMQyalUIiHReCfNLVX00jgkbb92f"
      key
    );
  },
  methods: {
    redirect() {
      this.stripe.redirectToCheckout({
        successUrl: "http://localhost:8080/en/find_a_tutor",
        cancelUrl: "http://localhost:8080",
        lineItems: [
          {
            price: "price_1JHk9nGR1ZOj2dmhWaAEqMux",
            quantity: 1,
          },
        ],
        mode: "payment",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#payButton {
  position: absolute;
  top: 50%;

  width: fit-content;
  padding: 0.5rem 1rem;
  background: var(--v-accent-base);
  color: var(--v-background-base);
  font-weight: bold;
  letter-spacing: 2px;
  border-radius: 15px;
}
</style>
