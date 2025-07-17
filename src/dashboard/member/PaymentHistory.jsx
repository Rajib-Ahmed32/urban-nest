import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 font-semibold mt-8 bg-[#f9f9f7] min-h-screen flex items-center justify-center">
        <Message type="error" text="Failed to load payment history." />
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400 mt-8 bg-[#f9f9f7] min-h-screen flex items-center justify-center">
        <Message type="info" text="No payment records found." />
      </div>
    );
  }

  return (
    <div className=" py-12 md:px-6">
      <div className="max-w-7xl mx-auto bg-[#f9f9f7] rounded-lg shadow-md p-4 md:p-8">
        <h2 className="text-2xl font-semibold text-[#ec5407] mb-8 text-center">
          Payment History
        </h2>
        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Amount (৳)</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Coupon Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>{payment.rent.toFixed(2)}</TableCell>
                  <TableCell className="break-all">
                    {payment.transactionId}
                  </TableCell>
                  <TableCell>{payment.couponUsed || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
