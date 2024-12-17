import React from "react";
import { FaMoneyCheckAlt, FaHistory } from "react-icons/fa"; // Icons for Add Fee and Fee History
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import ReusableCard from "../../components/Shared/ReusableCard"; // Reusable Card component

const FeesManagement = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Fees Management">
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1: Add Fee */}
        <div onClick={() => navigate("/fee/addfee")}>
          <ReusableCard
            title="Add Fee"
            description="Add new fee records to the system."
            icon={FaMoneyCheckAlt}
            iconColor="text-blue-500"
            link="/fee/addfee"
          />
        </div>

        {/* Card 2: Fee History */}
        <div onClick={() => navigate("/fee/feehistory")}>
          <ReusableCard
            title="Fee History"
            description="View and manage fee payment history."
            icon={FaHistory}
            iconColor="text-green-500"
            link="/fee/feehistory"
          />
        </div>
      </div>
    </Layout>
  );
};

export default FeesManagement;
