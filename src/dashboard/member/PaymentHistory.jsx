import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";
import Message from "../../components/commonReusableComponents/Message";

const fetchPayments = async (token) => {
  const res = await axios.get("/payment/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const PaymentHistory = () => {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      if (firebaseUser) {
        const fetchedToken = await firebaseUser.getIdToken();
        setToken(fetchedToken);
      }
    };
    getToken();
  }, [firebaseUser]);

  const {
    data: payments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-payments"],
    queryFn: () => fetchPayments(token),
    enabled: !!token,
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f9f9f7]">
        <Loader2 className="h-10 w-10 animate-spin text-orange-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center mx-4 bg-[#f9f9f7]">
        <Message type="error" text="Failed to load payment history." />
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center mx-4 bg-[#f9f9f7]">
        <Message type="info" text="No payment records found." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f7] py-10">
      <div className="mx-4 md:mx-auto max-w-5xl px-6 py-8 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-[#ec5407] mb-6 text-center">
          Payment History
        </h2>

        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Amount (৳)</th>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Coupon Used</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr
                  key={payment._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{payment.month}</td>
                  <td className="px-4 py-3">{payment.rent.toFixed(2)}</td>
                  <td className="px-4 py-3 break-all">
                    {payment.transactionId}
                  </td>
                  <td className="px-4 py-3">{payment.couponUsed || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
