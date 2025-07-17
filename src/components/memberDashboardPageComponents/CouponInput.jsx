import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "../../services/apiClient";

const CouponInput = ({ rentAmount, token, onApply }) => {
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(
        `/coupons/validate/${couponCode.trim()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.valid) {
        const discount = rentAmount * (data.percentage / 100);
        const newRent = rentAmount - discount;

        onApply({
          success: true,
          code: couponCode.trim(),
          percentage: data.percentage,
          discountedAmount: newRent,
        });

        toast({
          title: "Coupon Applied",
          description: `You got ${data.percentage}% off!`,
        });
      } else {
        toast({
          title: "Invalid Coupon",
          description: data.message || "Coupon is not valid",
          variant: "destructive",
        });

        onApply({ success: false });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Coupon Error",
        description: "Failed to validate coupon",
        variant: "destructive",
      });

      onApply({ success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label
        htmlFor="coupon"
        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Coupon Code
      </label>
      <div className="flex gap-2">
        <input
          id="coupon"
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          disabled={loading}
          className="px-3 py-2 bg-[#373634] hover:bg-[#ec5407] text-white rounded-md text-[14px] font-bold"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default CouponInput;
