import Stripe from "stripe";
import { config } from "./config";

const key = process.env.VUE_APP_PUBLISHABLE_KEY;
if (!key) throw new Error(`Stripe's publishable key is ${key}`);

export const stripe = key ? new Stripe(key, config) : null;
