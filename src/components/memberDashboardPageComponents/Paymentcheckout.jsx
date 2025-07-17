import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import axios from "../../services/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

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

const Paymentcheckout = ({ agreement, month, token }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
      const rentAmount = agreement?.rent;
      const userEmail = agreement?.userEmail;

      if (!rentAmount || !userEmail) {
        toast({
          title: "Missing Data",
          description: "Missing payment details.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        "/payment/create-payment-intent",
        {
          amount: rentAmount * 100,
          couponCode: couponCode.trim() || null,
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
          billing_details: {
            email: userEmail,
          },
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
            rent: rentAmount,
            transactionId: paymentResult.paymentIntent.id,
            month,
            date: new Date(),
            userEmail,
            couponUsed: couponCode.trim() || null,
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
        setCouponCode("");
      } else {
        toast({
          title: "Error",
          description: "Payment was not successful.",
          variant: "destructive",
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
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex items-center gap-3">
            <Loader2 className="animate-spin text-orange-600" size={24} />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Processing Payment...
            </span>
          </div>
        </div>
      )}

      <form
        onSubmit={handleCheckout}
        className="max-w-md mx-auto bg-[#f8f8f6] dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-xl font-semibold text-center text-[#ea580c] dark:text-white">
          Complete Your Payment
        </h2>

        <div>
          <label
            htmlFor="coupon"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Coupon Code (optional)
          </label>
          <input
            id="coupon"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            disabled={loading}
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

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
          className="w-full bg-[#373634] hover:bg-orange-700 text-white py-3 rounded-md font-semibold"
          disabled={!stripe || loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Processing...
            </span>
          ) : (
            `Pay ৳${agreement?.rent}`
          )}
        </Button>
      </form>
    </>
  );
};

export default Paymentcheckout;
