import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ReusableTable from "../Shared/ReusableTable";
import { setTransactions } from "../../redux/slices/librarySlice";
import {
  fetchAllTransactions,
  fetchTransactionsByStudentId,
} from "../../api/book";
import Layout from "../Layout/Layout";

const TransactionHistory = ({ token }) => {
  const { studentId } = useParams(); // Extract studentId from URL params
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.library.transactions);
  const navigate = useNavigate();

  // Fetch transactions on load
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        dispatch(setTransactions([])); // Reset transactions to avoid stale data
        let transactionsData;

        if (studentId) {
          transactionsData = await fetchTransactionsByStudentId(
            studentId,
            token
          );
        } else {
          transactionsData = await fetchAllTransactions(token);
        }

        dispatch(setTransactions(transactionsData));
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    };

    loadTransactions();
  }, [dispatch, token, studentId]);

  // Handle student click for navigation
  const handleStudentClick = (studentId) => {
    navigate(`/students/${studentId}`);
  };

  // Columns configuration
  const columns = [
    {
      key: "studentId",
      label: "Student ID",
    },
    { key: "bookId", label: "Book ID" },
    { key: "action", label: "Action" },
    {
      key: "date",
      label: "Date",
      render: (row) => new Date(row.date).toLocaleDateString(),
    },
  ];

  const processedTransactions = transactions.map((transaction) => ({
    ...transaction,
    studentId: (
      <span
        className="text-blue-600 cursor-pointer underline"
        onClick={() => handleStudentClick(transaction.studentId)}
      >
        {transaction.studentId}
      </span>
    ),
  }));

  return (
    <Layout title="Library Transactions">
      <div className="p-4 max-w-4xl mx-auto overflow-y-auto h-[85vh] scrollbar-hide">
        <ReusableTable columns={columns} data={processedTransactions} />
      </div>
    </Layout>
  );
};

export default TransactionHistory;
