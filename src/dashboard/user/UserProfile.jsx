import React from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileCard from "../../components/commonReusableComponents/ProfileCard";

const UserProfile = () => {
  const { user } = useAuth();

  const profileData = [
    { label: "Agreement Date", value: "none" },
    { label: "Floor", value: "none" },
    { label: "Block", value: "none" },
    { label: "Apartment No", value: "none" },
  ];

  return <ProfileCard user={user} data={profileData} />;
};

export default UserProfile;
