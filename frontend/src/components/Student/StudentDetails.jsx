import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentById,
  updateStudent as updateStudentAPI,
  deleteStudent as deleteStudentAPI,
} from "../../api/student";
import {
  setCurrentStudent,
  updateStudent,
  deleteStudent,
  setLoading,
  setError,
} from "../../redux/slices/studentSlice";
import ConfirmationModal from "../Shared/ConfirmationModal";
import Layout from "../Layout/Layout";
import ReusableCard from "../Shared/ReusableCard";
import { FaBook, FaMoneyBillAlt } from "react-icons/fa"; // Import necessary icons

const StudentDetailsPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentStudent: studentDetails, loading, error } = useSelector((state) => state.student);
  const currentUserRole = useSelector((state) => state.auth.user.role);

  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const isLibrarian = currentUserRole === "Librarian";

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchStudentById(studentId);
        dispatch(setCurrentStudent(data.student));
      } catch {
        dispatch(setError("Error fetching student details."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchDetails();
  }, [studentId, dispatch]);

  const validateField = (name, value) => {
    if (name === "name" && (!value || value.trim().length < 3)) {
      return "Name must be at least 3 characters long.";
    }
    if (name === "class" && (!value || !/^[a-zA-Z0-9\s]+$/.test(value))) {
      return "Class must be alphanumeric.";
    }
    if (name === "contact" && (!value || !/^\d{10}$/.test(value))) {
      return "Contact must be a valid 10-digit number.";
    }
    if (name === "location" && (!value || value.trim().length < 3)) {
      return "Location must be at least 3 characters long.";
    }
    return "";
  };

  const validateAllFields = () => {
    const newErrors = {};
    Object.keys(studentDetails).forEach((key) => {
      const error = validateField(key, studentDetails[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    return newErrors;
  };

  const handleChange = ({ target: { name, value } }) => {
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    dispatch(updateStudent({ ...studentDetails, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess("");

    const newErrors = validateAllFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await updateStudentAPI(studentId, studentDetails);
      setSuccess("Student details updated successfully!");
    } catch {
      dispatch(setError("Failed to update student details"));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStudentAPI(studentId);
      dispatch(deleteStudent(studentId));
      setSuccess("Student Deleted Successfully");
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch {
      dispatch(setError("Failed to delete student"));
    } finally {
      setShowModal(false);
    }
  };

  if (loading) return <p className="text-center">Loading student details...</p>;
  if (!studentDetails) return <p className="text-center">No student details found.</p>;

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Class", name: "class", type: "text" },
    { label: "Contact", name: "contact", type: "text" },
    { label: "Location", name: "location", type: "text" },
    { label: "Student ID", name: "studentId", type: "text", disabled: true },
  ];

  return (
    <Layout title="Student Details">
      <div className="p-4 max-w-4xl mx-auto">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        {/* Reusable Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <ReusableCard
            title="Library Records"
            description="View borrowed books by this student."
            icon={FaBook}
            iconColor="text-blue-500"
            link={`/libraryrecords/${studentId}`}
          />

{!isLibrarian &&<ReusableCard
            title="Fee Records"
            description="View fee payment history for this student."
            icon={FaMoneyBillAlt}
            iconColor="text-green-500"
            link={`/fee/feehistory/${studentId}`}
          />}
        </div>

        {/* Student Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ label, name, type, disabled }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  name={name}
                  type={type}
                  value={studentDetails[name] || ""}
                  onChange={handleChange}
                  disabled={disabled || isLibrarian}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4">
            {!isLibrarian && (
              <>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                  Delete Student
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto ${
                !isLibrarian ? "mt-2 sm:mt-0" : ""
              }`}
            >
              Back
            </button>
          </div>
        </form>

        <ConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this student? This action cannot be undone."
        />
      </div>
    </Layout>
  );
};

export default StudentDetailsPage;
