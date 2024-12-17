import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Sidebar = ({ links }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch logout action to clear user session
    dispatch(logout());
    // Redirect to login page
    navigate("/login");
  };

  return (
    <aside className="bg-gray-800 text-white w-64 h-screen p-4 flex flex-col justify-between">
      <nav>
        <ul className="space-y-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
