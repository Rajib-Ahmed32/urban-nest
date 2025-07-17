import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Message from "../../components/commonReusableComponents/Message";

const fetchAcceptedAgreement = async (token) => {
  const res = await axios.get("/agreements/user/accepted", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const MakePayment = () => {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [token, setToken] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const navigate = useNavigate();

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
    data: agreement,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["accepted-agreement"],
    queryFn: () => fetchAcceptedAgreement(token),
    enabled: !!token,
  });

  const handlePay = () => {
    if (!selectedMonth) return alert("Please select a month");
    navigate("/dashboard/member/checkout", {
      state: {
        agreement,
        month: selectedMonth,
        token,
      },
    });
  };

  if (authLoading || isLoading) {
    return <Message type="info" text="Loading agreement details..." />;
  }

  if (error) {
    return <Message type="error" text="Failed to fetch agreement." />;
  }

  if (!agreement?._id) {
    return (
      <Message type="info" text="No accepted agreement found for this user." />
    );
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePay();
        }}
        className="space-y-6 bg-[#f8f8f6] dark:bg-gray-900 border rounded-xl p-8 shadow-sm"
      >
        <h1 className="text-2xl font-semibold text-center text-[#ec5407] mb-6">
          Make Rent Payment
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Member Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Member Email
            </label>
            <input
              type="text"
              readOnly
              value={agreement.userEmail}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-md text-sm"
            />
          </div>

          {/* Floor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Floor
            </label>
            <input
              type="text"
              readOnly
              value={agreement.floor}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-md text-sm"
            />
          </div>

          {/* Block Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Block Name
            </label>
            <input
              type="text"
              readOnly
              value={agreement.block}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-md text-sm"
            />
          </div>

          {/* Apartment / Room No */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Apartment / Room No
            </label>
            <input
              type="text"
              readOnly
              value={agreement.apartmentNo}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-md text-sm"
            />
          </div>

          {/* Rent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rent Amount
            </label>
            <input
              type="text"
              readOnly
              value={`৳${agreement.rent}`}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-md text-sm"
            />
          </div>

          {/* Month Selector */}
          <div>
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Select Month
            </label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-md text-sm"
              required
            >
              <option value="">-- Choose a Month --</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#373634] hover:bg-[#bf3f06] text-white py-3 px-4 rounded-md text-sm mt-4"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default MakePayment;
