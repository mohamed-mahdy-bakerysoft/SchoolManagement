import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  addFeesRecord,
  updateFeesRecord,
  deleteFeesRecord,
} from "../../redux/slices/feesSlice";
import {
  fetchFeesRecordByTransactionId,
  addFeesRemark,
  updateFeesRecordapi,
  deleteFeesRecordapi,
} from "../../api/fees";
import InputField from "../Shared/InputField";
import ConfirmationModal from "../Shared/ConfirmationModal";
import Layout from "../Layout/Layout";

const FeesForm = ({ token }) => {
  const { transactionId } = useParams(); // Get transactionId from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUpdate = !!transactionId; // Check if this is an update mode
  const [formData, setFormData] = useState({
    transactionId: transactionId || "",
    studentId: "",
    feeType: "",
    amount: "",
    paymentDate: "",
    remarks: "",
    status: "Pending",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Fetch data for update mode
  useEffect(() => {
    if (isUpdate) {
      const fetchData = async () => {
        try {
          const data = await fetchFeesRecordByTransactionId(
            transactionId,
            token
          );
          setFormData(data);
        } catch (err) {
          setError("Failed to load data for the transaction.");
          console.error(err);
        }
      };
      fetchData();
    }
  }, [isUpdate, transactionId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      let responseData;
      if (isUpdate) {
        responseData = await updateFeesRecordapi(
          transactionId,
          formData,
          token
        );
        dispatch(updateFeesRecord(responseData)); // Update Redux state
        setSuccess("Fees record updated successfully!");
      } else {
        responseData = await addFeesRemark(formData, token); // Backend create API
        dispatch(addFeesRecord(responseData)); // Update Redux state
        setSuccess("Fees remark added successfully!");
        setFormData({
          transactionId: "",
          studentId: "",
          feeType: "",
          amount: "",
          paymentDate: "",
          remarks: "",
          status: "Pending",
        });
      }
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleDelete = async () => {
    setError("");
    setSuccess("");
    try {
      await deleteFeesRecordapi(transactionId, token);
      dispatch(deleteFeesRecord(transactionId)); // Remove from Redux state
      setSuccess("Fees record deleted successfully!");
      setIsModalOpen(false); // Close the modal
      setTimeout(() => {
        navigate(-1); // Redirect back
      }, 1000);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <Layout title={isUpdate ? "Update Fees Record" : "Add Fees Remark"}>
      <div className="p-4 max-w-xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Transaction ID"
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            placeholder="Enter Transaction ID"
            disabled={isUpdate} // Disable in update mode
          />
          <InputField
            label="Student ID"
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Enter Student ID"
          />
          <InputField
            label="Fee Type"
            type="text"
            name="feeType"
            value={formData.feeType}
            onChange={handleChange}
            placeholder="Enter Fee Type"
          />
          <InputField
            label="Amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
          />
          <InputField
            label="Payment Date"
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
          />
          <InputField
            label="Remarks"
            type="textarea"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Enter Remarks"
          />
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">Partially Paid</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              {isUpdate ? "Update Record" : "Add Remark"}
            </button>
            {isUpdate && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete Record
              </button>
            )}
          </div>
        </form>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this fees record?"
        />
      </div>
    </Layout>
  );
};

export default FeesForm;
