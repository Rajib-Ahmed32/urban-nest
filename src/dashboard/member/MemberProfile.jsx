import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import axios from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import Message from "../../components/commonReusableComponents/Message";
import ProfileCard from "../../components/commonReusableComponents/ProfileCard";

const fetchAcceptedAgreement = async (token) => {
  console.log("Fetching accepted agreement with token:", token);
  const res = await axios.get("/agreements/user/accepted", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("Response from API:", res.data);
  return res.data;
};

const MemberProfile = () => {
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["acceptedAgreement"],
    queryFn: () => fetchAcceptedAgreement(token),
    enabled: !!token,
  });

  console.log("Query Data:", data);
  console.log("Loading:", isLoading, "Error:", error);

  if (loading || isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
        <Loader2 className="h-10 w-10 animate-spin text-[#ec5407]" />
      </div>
    );
  }

  if (error) {
    return (
      <Message
        type="error"
        text="Failed to fetch your agreement. Please try again later."
      />
    );
  }

  if (!data?._id) {
    return <Message type="info" text="No approved agreement found." />;
  }
  const profileData = [
    { label: "Name", value: data.userName },
    { label: "Email", value: data.userEmail },
    { label: "Floor", value: data.floor },
    { label: "Block", value: data.block },
    { label: "Apartment No", value: data.apartmentNo },
    { label: "Rent", value: `৳ ${data.rent}` },
    {
      label: "Agreement Date",
      value: new Date(data.createdAt).toLocaleDateString(),
    },
    { label: "Status", value: data.status },
  ];

  return (
    <div className="px-4 md:px-0">
      <ProfileCard user={user} data={profileData} />;
    </div>
  );
};

export default MemberProfile;
