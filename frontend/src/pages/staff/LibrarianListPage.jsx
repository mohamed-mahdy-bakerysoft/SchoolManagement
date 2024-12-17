import React, { useEffect, useState } from "react";
import { fetchAllLibrarian } from "../../api/staff";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../components/Shared/ReusableTable";
import Layout from "../../components/Layout/Layout";

const LibrarianListPage = () => {
  const [librarianList, setLibrarianList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibrarian = async () => {
      try {
        const data = await fetchAllLibrarian();
        setLibrarianList(data);
      } catch (error) {
        console.error("Error fetching librarian list:", error);
      }
    };

    fetchLibrarian();
  }, []);

  const columns = [
    { key: "staffId", label: "Staff ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];

  const actions = [
    {
      label: "Edit",
      onClick: (staff) => navigate(`/staff/${staff.staffId}`),
    },
  ];

  return (
    <Layout title="Librarians List">
      <div className="p-4">
        <ReusableTable
          columns={columns}
          data={librarianList}
          actions={actions}
        />
      </div>
    </Layout>
  );
};

export default LibrarianListPage;
