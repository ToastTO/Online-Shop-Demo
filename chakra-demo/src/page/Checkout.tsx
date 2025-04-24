import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// load strip
const stripePromise = loadStripe(
  "pk_test_51RGfcqQVZoIHpRlNVkz7naOIgrl92qKAIeS3R2N9ivOr6yMkPR5qO06Ck2R7nL0gTiadwXkAL5zzXbS9DMJCC7DY00Yj8mLsnN"
);

const Checkout = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("api/product/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default Checkout;
