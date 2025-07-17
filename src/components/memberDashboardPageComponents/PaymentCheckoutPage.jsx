import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Paymentcheckout from "./Paymentcheckout";
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
    <div className="p-8 rounded-md">
      <Elements stripe={stripePromise}>
        <Paymentcheckout agreement={agreement} month={month} token={token} />
      </Elements>
    </div>
  );
};

export default PaymentCheckoutPage;
