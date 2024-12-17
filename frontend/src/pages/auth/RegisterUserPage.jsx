import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth"; // Backend API function
import Layout from "../../components/Layout/Layout";

const RegisterUserPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    staffId: "", // New field for staff ID
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user?.role);
  const token = useSelector((state) => state.auth.token);

  // Redirect non-admin users or unauthenticated users
  if (!isAuthenticated || userRole !== "admin") {
    navigate("/login");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Call the register API with token authorization
      await register(formData, token);
      setSuccess(`User ${formData.role} registered successfully!`);
      setFormData({ name: "", email: "", password: "", role: "", staffId: "" }); // Reset form
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <Layout title="Register a User">
      <div className="flex justify-center items-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-lg w-96"
        >
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Office Staff">Office Staff</option>
              <option value="Librarian">Librarian</option>
            </select>
          </div>

          {/* New field for Staff ID */}
          <div className="mb-4">
            <label className="block mb-2">Staff ID</label>
            <input
              type="text"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              placeholder="Enter staff ID"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded btn-primary w-full"
          >
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterUserPage;
