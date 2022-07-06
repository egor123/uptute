import { stripe } from "./stripe/Stripe";

export const checkout = async (priceId: string) => {
  if (!stripe) return;

  return await stripe!.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    client_reference_id: "SESSION_ID_FROM_OWN_SERVER)", // TODO fetch from backend
    cancel_url: "http://localhost:8080/en/shop",
    success_url: "http://localhost:8080/en",
  });
};
