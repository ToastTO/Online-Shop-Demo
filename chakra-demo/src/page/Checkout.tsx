import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Box } from "@chakra-ui/react";
import useShoppingCartStore from "../../store/cart";

// load strip
const stripePromise = loadStripe(
  "pk_test_51RGfcqQVZoIHpRlNVkz7naOIgrl92qKAIeS3R2N9ivOr6yMkPR5qO06Ck2R7nL0gTiadwXkAL5zzXbS9DMJCC7DY00Yj8mLsnN"
);

const Checkout = () => {
  const { cart } = useShoppingCartStore();

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("api/product/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <Box p={"3"}>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Box>
  );
};

export default Checkout;
