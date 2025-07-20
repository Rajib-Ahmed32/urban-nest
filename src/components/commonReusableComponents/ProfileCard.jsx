import React from "react";
import { CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageWrapper from "../../components/commonReusableComponents/PageWrapper";

const ProfileCard = ({ user, data = [], avatarSize = "w-20 h-20" }) => {
  return (
    <PageWrapper>
      <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-10 flex flex-col md:flex-row gap-14 items-center transition-all duration-300">
        <div className="flex-1 flex flex-col items-center text-center space-y-2">
          <Avatar className={`${avatarSize} shadow-md ring-2 ring-orange-500`}>
            <AvatarImage src={user?.photoURL} alt="Profile" />
            <AvatarFallback className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white text-xl">
              {user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mt-2">
            {user?.name || "Anonymous User"}
          </CardTitle>

          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            @{user?.name?.toLowerCase().replace(/\s+/g, "") || "username"}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            {user?.email || "No email"}
          </p>
        </div>

        <div className="flex-[1.5] w-full space-y-4">
          {data.map(({ label, value }, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3"
            >
              <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                {label}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfileCard;
