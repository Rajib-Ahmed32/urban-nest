import React from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const transactionId = location.state?.transactionId || "N/A";

  return (
    <div className="flex p-8 flex-col justify-center items-center dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <svg
          className="mx-auto mb-6 w-16 h-16 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>

        <h1 className="text-3xl font-extrabold text-green-600 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Your transaction ID is:
        </p>
        <p className="font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm text-gray-900 dark:text-gray-100 break-all mb-6">
          {transactionId}
        </p>

        <Link
          to="/dashboard/member"
          className="inline-block px-5 py-2 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 text-white rounded-md font-semibold transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
