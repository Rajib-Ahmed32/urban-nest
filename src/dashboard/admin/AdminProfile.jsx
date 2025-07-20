import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import axios from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import Message from "../../components/commonReusableComponents/Message";
import ProfileCard from "../../components/commonReusableComponents/ProfileCard";
import PageWrapper from "../../components/commonReusableComponents/PageWrapper";

const fetchAdminOverview = async (token) => {
  const res = await axios.get("/agreements/apartment/overview", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const fetchUserCounts = async (token) => {
  const res = await axios.get("/users/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const AdminProfile = () => {
  const { user, firebaseUser, loading } = useAuth();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      if (firebaseUser) {
        const fetchedToken = await firebaseUser.getIdToken();
        setToken(fetchedToken);
      } else {
        setToken(null);
      }
    };
    getToken();
  }, [firebaseUser]);

  const {
    data: overviewData,
    isLoading: overviewLoading,
    error: overviewError,
  } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: () => fetchAdminOverview(token),
    enabled: !!token,
  });

  const {
    data: userCountData,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["userCounts"],
    queryFn: () => fetchUserCounts(token),
    enabled: !!token,
  });

  if (loading || overviewLoading || userLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
        <Loader2 className="h-10 w-10 animate-spin text-[#dd4b08]" />
      </div>
    );
  }

  if (overviewError || userError) {
    return (
      <Message
        type="error"
        text="Failed to fetch admin or user data. Please try again later."
      />
    );
  }

  if (!overviewData || !userCountData) {
    return <Message type="info" text="No admin or user data found." />;
  }

  const profileData = [
    { label: "Total Apartments", value: overviewData.totalApartments },
    { label: "Available Apartments", value: overviewData.availableApartments },
    { label: "Available %", value: `${overviewData.availablePercentage}%` },
    {
      label: "Unavailable Apartments",
      value: overviewData.unavailableApartments,
    },
    { label: "Unavailable %", value: `${overviewData.unavailablePercentage}%` },
    { label: "Total Users", value: userCountData.totalUsers },
    { label: "Total Members", value: userCountData.totalMembers },
  ];

  return (
    <PageWrapper>
      <ProfileCard user={user} data={profileData} />
    </PageWrapper>
  );
};

export default AdminProfile;
