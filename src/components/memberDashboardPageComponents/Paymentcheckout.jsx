import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "../../services/apiClient";
import { useToast } from "@/components/ui/use-toast";
import CouponInput from "./CouponInput";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      fontFamily: "Roboto, sans-serif",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
};

const PaymentCheckout = ({ agreement, month, token }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { toast } = useToast();

  const rentAmount = agreement?.rent || 0;
  const userEmail = agreement?.userEmail;

  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountedRent, setDiscountedRent] = useState(rentAmount);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCouponApply = ({
    success,
    code,
    percentage,
    discountedAmount,
  }) => {
    if (success) {
      setCouponApplied(true);
      setCouponCode(code);
      setDiscountPercentage(percentage);
      setDiscountedRent(discountedAmount);
    } else {
      setCouponApplied(false);
      setCouponCode("");
      setDiscountPercentage(0);
      setDiscountedRent(rentAmount);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Error",
        description: "Stripe has not loaded yet.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const amountInCents = Math.round(discountedRent * 100);

      const { data } = await axios.post(
        "/payment/create-payment-intent",
        {
          amount: amountInCents,
          couponCode: couponApplied ? couponCode : null,
          month,
          email: userEmail,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const clientSecret = data.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { email: userEmail },
        },
      });

      if (paymentResult.error) {
        toast({
          title: "Payment Failed",
          description: paymentResult.error.message || "Payment failed",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
        await axios.post(
          "/payment/save",
          {
            agreementId: agreement._id,
            rent: discountedRent,
            transactionId: paymentResult.paymentIntent.id,
            month,
            date: new Date(),
            userEmail,
            couponUsed: couponApplied ? couponCode : null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast({
          title: "Success",
          description: "Payment completed successfully.",
        });

        navigate("/dashboard/member/payment-success", {
          state: { transactionId: paymentResult.paymentIntent.id },
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong during payment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="dark:bg-gray-900 p-6 rounded-lg flex items-center gap-3">
            <Loader2 className="animate-spin text-orange-600" size={24} />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Processing Payment...
            </span>
          </div>
        </div>
      )}

      <form
        onSubmit={handleCheckout}
        className="max-w-md mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-[#ec5407] dark:text-white">
          Complete Your Payment
        </h2>

        <CouponInput
          rentAmount={rentAmount}
          token={token}
          onApply={handleCouponApply}
        />

        <div>
          <label
            htmlFor="card-element"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Card Information
          </label>
          <div
            id="card-element"
            className="p-3 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800"
          >
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#373634] hover:bg-[#ec5407] text-white py-3 rounded-md font-semibold transition"
          disabled={!stripe || loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Processing...
            </span>
          ) : couponApplied ? (
            `Pay ৳${Math.round(
              discountedRent
            )} (with ${discountPercentage}% off)`
          ) : (
            `Pay ৳${rentAmount}`
          )}
        </Button>
      </form>
    </>
  );
};

export default PaymentCheckout;
