import React from "react";
import { CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileCard = ({
  user,
  data = [],
  title = "User Profile",
  avatarSize = "w-20 h-20",
}) => {
  const textColor = "#373634";

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 sm:px-6 md:px-10">
      <div className="border border-gray-300 dark:border-gray-700 flex flex-col md:flex-row justify-center items-center gap-8 rounded-2xl p-6 sm:p-8 md:p-10 bg-[#f8f8f6] shadow-md">
        <div className="flex-1 flex flex-col items-center text-center space-y-3">
          <Avatar className={`${avatarSize} mb-3 shadow-md`}>
            <AvatarImage src={user?.photoURL} alt="Profile" />
            <AvatarFallback className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white text-xl">
              {user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>

          <CardTitle
            style={{ color: textColor }}
            className="text-xl font-semibold"
          >
            {user?.name || "Anonymous User"}
          </CardTitle>

          <p
            className="text-sm font-medium opacity-80"
            style={{ color: textColor }}
          >
            @{user?.name?.toLowerCase().replace(/\s+/g, "") || "username"}
          </p>

          <p
            className="text-sm font-normal opacity-80"
            style={{ color: textColor }}
          >
            {user?.email || "No email"}
          </p>
        </div>

        <div className="flex-[1.5] w-full mt-4 md:mt-2 space-y-4">
          {data.map(({ label, value }, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
            >
              <div
                className="text-sm font-semibold"
                style={{ color: textColor }}
              >
                {label}
              </div>
              <div
                className="text-sm font-normal opacity-80"
                style={{ color: textColor }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
