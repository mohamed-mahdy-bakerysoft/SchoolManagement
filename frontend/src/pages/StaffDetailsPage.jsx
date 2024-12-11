import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStaffById, updateStaff, deleteStaff } from '../api/staff'; // Assume these API functions exist
import ConfirmationModal from '../components/Shared/ConfirmationModal';

const StaffDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [staffDetails, setStaffDetails] = useState({
    name: '',
    email: '',
    role: '',
    staffId: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const data = await fetchStaffById(id);
        setStaffDetails(data);
      } catch (error) {
        setError('Error fetching staff details.');
        console.error('Error fetching staff details:', error);
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
    setError('');
    setSuccess('');

    try {
      await updateStaff(id, staffDetails); // API call to update staff details
      setSuccess('Staff details updated successfully!');
    } catch (error) {
      setError('Failed to update staff details');
      console.error('Error updating staff:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStaff(id); // API call to delete staff
      navigate(-1); // Redirect to staff list
    } catch (error) {
      setError('Failed to delete staff member');
      console.error('Error deleting staff:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal without doing anything
  };

  const confirmDelete = () => {
    handleDelete(); // Confirm deletion
    closeModal(); // Close modal after confirmation
  };

  if (!staffDetails.name) {
    return <p>Loading...</p>; // Loading state while fetching staff details
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Staff Details</h1>

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
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>

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
  );
};

export default StaffDetailsPage;
