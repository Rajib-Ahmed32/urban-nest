import React from "react";

const AnnouncementCard = ({ title, description, createdAt }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-700 text-sm whitespace-pre-line mb-3">
        {description.length > 200
          ? description.slice(0, 200) + "..."
          : description}
      </p>

      <p className="text-xs text-gray-500 italic">
        Posted at {new Date(createdAt).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default AnnouncementCard;
