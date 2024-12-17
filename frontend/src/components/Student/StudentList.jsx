import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReusableTable from "../Shared/ReusableTable";
import { getAllStudents } from "../../api/student"; // Adjust path as necessary
import {
  setStudents,
  setLoading,
  setError,
} from "../../redux/slices/studentSlice"; // Import the actions
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

const StudentList = ({ token }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);
  const loading = useSelector((state) => state.student.loading);
  const error = useSelector((state) => state.student.error);
  const navigate = useNavigate();

  // Fetch all students from the API
  const fetchStudents = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getAllStudents(token);
      dispatch(setStudents(data.students)); // Dispatch setStudents with fetched data
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError(err.message || "Failed to fetch students"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Navigate to the details page with student details
  const handleViewDetails = (studentId) => {
    navigate(`/students/${studentId}`); // Pass studentId to navigate
  };

  useEffect(() => {
    fetchStudents();
  }, [token, dispatch]);

  // Define columns for the student list
  const columns = [
    { key: "name", label: "Name" },
    { key: "class", label: "Class" },
    { key: "contact", label: "Contact" },
    { key: "studentId", label: "Student ID" },
    { key: "location", label: "Location" },
  ];

  // Define actions for each student
  const actions = [
    {
      label: "View Details",
      onClick: (student) => handleViewDetails(student.studentId),
      className: "text-blue-500 hover:underline",
    },
  ];

  
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout title="Student List">
    <div>
      <ReusableTable columns={columns} data={students} actions={actions} />
    </div>
    </Layout>
  );
};

export default StudentList;
