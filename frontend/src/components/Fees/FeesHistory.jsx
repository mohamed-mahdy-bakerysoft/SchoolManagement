import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFeesHistory, fetchFeesByStudentId } from "../../api/fees"; // Import APIs
import { setFeesHistory } from "../../redux/slices/feesSlice";
import ReusableTable from "../Shared/ReusableTable";
import Layout from "../Layout/Layout";

const FeesHistory = () => {
  const { studentId } = useParams(); // Extract studentId from route params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [feesHistory, setFeesHistoryState] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let data;
        if (studentId) {
          // Fetch fees for a specific student if studentId exists
          data = await fetchFeesByStudentId(studentId);
        } else {
          // Fetch all fees history
          data = await fetchFeesHistory();
        }
        setFeesHistoryState(data); // Update local state
        dispatch(setFeesHistory(data)); // Update Redux state
      } catch (err) {
        console.error("Failed to fetch fees history:", err);
      }
    };

    fetchHistory();
  }, [dispatch, studentId]);

  const columns = [
    { key: "transactionId", label: "Transaction ID" },
    { key: "studentId", label: "Student ID" },
    { key: "feeType", label: "Fee Type" },
    { key: "amount", label: "Amount" },
    {
      key: "paymentDate",
      label: "Payment Date",
      render: (row) => new Date(row.paymentDate).toLocaleDateString(), // Format date
    },
    { key: "remarks", label: "Remarks" },
    { key: "status", label: "Status" }, // Status column
  ];

  const actions = [
    {
      label: "Manage Transaction",
      onClick: (row) => navigate(`/transactions/${row.transactionId}`),
    },
  ];

  return (
    <Layout title="Fees History">
      <div className="p-4 mx-auto overflow-y-auto h-[85vh] scrollbar-hide">
        <ReusableTable columns={columns} data={feesHistory} actions={actions} />
      </div>
    </Layout>
  );
};

export default FeesHistory;
