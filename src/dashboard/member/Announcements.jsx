import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";
import Message from "../../components/commonReusableComponents/Message";

const fetchAnnouncements = async (token) => {
  const res = await axios.get("/announcements", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const Announcements = ({ pageTitle = "Announcements" }) => {
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
    data: announcements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: () => fetchAnnouncements(token),
    enabled: !!token,
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Message type="error" text="Failed to load announcements." />
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Message type="info" text="No announcements available." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-orange-600 mb-10">
          {pageTitle}
        </h2>

        <div className="space-y-6">
          {announcements.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 p-5 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {item.description}
              </p>
              <p className="text-xs text-gray-700 font-bold text-right">
                Posted on {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
