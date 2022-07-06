<template>
  <button id="payButton" @click="redirect">Pay</button>
</template>

<script>
// import { loadStripe } from "@stripe/stripe-js";

export default {
  name: "Stripe",
  data() {
    return {
      stripe: null,
    };
  },
  // created() {
  //   this.stripe = Stripe(process.env.VUE_APP_PUBLISHABLE_KEY);
  // },
  // methods: {
  //   redirect() {
  //     this.stripe.redirectToCheckout({
  //       successUrl: "http://localhost:8080/en/find_a_tutor", //base url
  //       cancelUrl: "http://localhost:8080", // base url
  //       lineItems: [
  //         {
  //           price: "price_1JHk9nGR1ZOj2dmhWaAEqMux",
  //           quantity: 1,
  //         },
  //       ],
  //       mode: "payment",
  //     });
  //   },
  // },
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
