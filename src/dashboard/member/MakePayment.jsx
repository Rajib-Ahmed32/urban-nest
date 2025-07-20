import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../services/apiClient";
import { Loader2 } from "lucide-react";
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
      state: { agreement, month: selectedMonth, token },
    });
  };

  if (authLoading || isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-white/60 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-700" />
      </div>
    );
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePay();
        }}
        className="space-y-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
      >
        <h1 className="text-2xl font-semibold text-center text-[#ec5407]">
          Make Rent Payment
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReadOnlyInput label="Member Email" value={agreement.userEmail} />
          <ReadOnlyInput label="Floor" value={agreement.floor} />
          <ReadOnlyInput label="Block Name" value={agreement.block} />
          <ReadOnlyInput
            label="Apartment / Room No"
            value={agreement.apartmentNo}
          />
          <ReadOnlyInput label="Rent Amount" value={`৳${agreement.rent}`} />

          <div>
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Month
            </label>
            <select
              id="month"
              required
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
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

        <button
          type="submit"
          className="w-fit px-6 bg-[#373634] hover:bg-[#bf3f06] text-white py-2 rounded-md text-sm font-medium transition duration-200 mx-auto block"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

const ReadOnlyInput = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      readOnly
      value={value}
      className="w-full border border-gray-300 bg-gray-50 p-3 rounded-md text-sm text-gray-700"
    />
  </div>
);

export default MakePayment;
