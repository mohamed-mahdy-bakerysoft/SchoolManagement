import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStaffById, updateStaff, deleteStaff } from "../../api/staff"; // API functions
import ConfirmationModal from "../../components/Shared/ConfirmationModal";
import Layout from "../../components/Layout/Layout";

const StaffDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [staffDetails, setStaffDetails] = useState({
    name: "",
    email: "",
    role: "",
    staffId: "",
  });
  const [error, setError] = useState(""); // To show errors
  const [success, setSuccess] = useState(""); // To show success messages
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const data = await fetchStaffById(id); // Fetch staff by ID
        setStaffDetails(data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching staff details."
        );
        console.error("Error fetching staff details:", error);
      }
    };

    fetchStaffDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Frontend validation
    if (!staffDetails.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!staffDetails.email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(staffDetails.email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const updatedStaff = await updateStaff(id, staffDetails); // Update staff details
      setSuccess("Staff details updated successfully!");
      setStaffDetails(updatedStaff); // Update local state with updated data
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || "Failed to update staff details."
      );
      console.error("Error updating staff:", error);

      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStaff(id); // Delete staff by ID
      setSuccess("Staff deleted successfully!");
      setTimeout(() => {
        navigate(-2);
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete staff member."
      );
      console.error("Error deleting staff:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const confirmDelete = () => {
    handleDelete(); // Confirm deletion
    closeModal(); // Close modal after confirmation
  };

  return (
    <Layout title="Staff Details">
      <div className="p-4">
        {/* Error and success messages */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block">Name:</label>
            <input
              type="text"
              name="name"
              value={staffDetails.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block">Email:</label>
            <input
              type="email"
              name="email"
              value={staffDetails.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block">Role:</label>
            <select
              name="role"
              value={staffDetails.role}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="Office Staff">Office Staff</option>
              <option value="Librarian">Librarian</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={openModal} // Open modal when clicking "Delete User"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete User
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this staff member?"
        />
      </div>
    </Layout>
  );
};

export default StaffDetailsPage;
