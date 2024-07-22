import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ productName, totalPrice }) => {
  const [isPaid, setIsPaid] = useState(false);
  // State qui gère les messages d'erreurs

  const stripe = useStripe();
  const elements = useElements();

  // console.log(totalPrice);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (elements == null) {
        return;
      }

      await elements.submit();
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/v2/payment`,
        {
          amount: totalPrice,
          title: productName,
        }
      );

      const clientSecret = response.data.client_secret;

      const stripeResponse = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        redirect: "if_required",
      });

      if (stripeResponse.error) {
        alert("Une erreur est survenue, veuillez réssayer.");
      }

      if (stripeResponse.paymentIntent.status === "succeeded") {
        setIsPaid(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return isPaid ? (
    <p>Merci pour votre achat.</p>
  ) : (
    <form onSubmit={handleSubmit}>
      {/* <CardElement /> */}
      <PaymentElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
