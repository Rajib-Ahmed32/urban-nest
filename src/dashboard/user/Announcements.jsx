import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";
import Message from "../../components/commonReusableComponents/Message";
import AnnouncementCard from "../../components/commonReusableComponents/AnnouncementCard";

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
      <div className="flex justify-center items-center h-screen bg-[#f9f9f7]">
        <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold mt-8 bg-[#f9f9f7] min-h-screen flex items-center justify-center">
        <Message type="error" text="Failed to load announcements." />
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-8 bg-[#f9f9f7] min-h-screen flex items-center justify-center">
        <Message type="info" text="No announcements yet." />
      </div>
    );
  }

  return (
    <div className="py-12 px-4 md:px-8 bg-[#f9f9f7] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-10">
          {pageTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((a) => (
            <AnnouncementCard
              key={a._id}
              title={a.title}
              description={a.description}
              createdAt={a.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
