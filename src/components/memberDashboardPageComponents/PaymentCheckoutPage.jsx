import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCheckout from "./PaymentCheckout";
import Message from "../commonReusableComponents/Message";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentCheckoutPage = () => {
  const { state } = useLocation();
  const { agreement, month, token } = state || {};

  if (!agreement || !month || !token) {
    return (
      <Message type="error" text="Invalid payment data. Please try again." />
    );
  }

  return (
    <div className="p-8 max-w-lg mx-auto rounded-lg bg-white dark:bg-gray-900 shadow-lg">
      <Elements stripe={stripePromise}>
        <PaymentCheckout agreement={agreement} month={month} token={token} />
      </Elements>
    </div>
  );
};

export default PaymentCheckoutPage;
