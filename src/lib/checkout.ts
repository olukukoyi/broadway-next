import { loadStripe, Stripe } from "@stripe/stripe-js";

interface checkoutProps {
  lineItems:
    | { price?: string | undefined; quantity?: number | undefined }[]
    | undefined;
}

export const checkout = async ({ lineItems }: checkoutProps) => {
  let stripePromise: Promise<Stripe | null>;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  const checkoutPromise = await stripe?.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });

  console.log("done");
};
