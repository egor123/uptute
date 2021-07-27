<template>
  <button id="payButton" @click="redirect()">Pay</button>
</template>

<script>
import AccountBase from "@/components/account/AccountBase.vue";

export default {
  components: {
    AccountBase,
  },
  data() {
    return {
      stripe: null,
    };
  },

  mounted() {
    this.stripe = Stripe(
      "pk_test_51ITQGGGR1ZOj2dmhE9k2XU35NGtYO4XaFxZBg76Qm0wNddyRnIvnqnsi8BIJRioPDZozrXNMQyalUIiHReCfNLVX00jgkbb92f"
    );
  },

  methods: {
    redirect() {
      return this.stripe.redirectToCheckout({
        successUrl: "http://localhost:8080/find_a_tutor",
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
    // return { redirect };
  },
};
</script>

<style lang="scss" scoped>
#payButton {
  position: absolute;
  top: 50%;

  width: 100px;
  background: var(--v-accent-base);
  border-radius: 15px;
}
</style>
