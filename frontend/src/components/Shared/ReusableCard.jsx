import React from "react";
import { Link } from "react-router-dom";

const ReusableCard = ({ title, description, icon: Icon, link, iconColor }) => {
  return (
    <Link
      to={link}
      className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center space-x-4">
        <Icon className={`text-4xl ${iconColor}`} />
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ReusableCard;
