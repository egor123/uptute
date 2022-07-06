import { MyStripe } from "./stripe/Stripe";

export const checkout = async (price: string) => {
  const stripe = await MyStripe.get();
  console.warn();

  if (!stripe) return;

  return await stripe.redirectToCheckout({
    // sessionId: "SESSION_ID_FROM_OWN_SERVER", // TODO fetch from backend
    lineItems: [{ price, quantity: 1 }],
    cancelUrl: "http://localhost:8080/en/shop",
    successUrl: "http://localhost:8080/en",
    mode: "payment",
    locale: MyStripe.locale,
  });
};
