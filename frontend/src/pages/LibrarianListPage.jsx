import React, { useEffect, useState } from 'react';
import { fetchAllLibrarian } from '../api/staff';
import { useNavigate } from 'react-router-dom';
import ReusableTable from '../components/Shared/ReusableTable';

const LibrarianListPage = () => {
  const [librarianList, setLibrarianList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibrarian = async () => {
      try {
        const data = await fetchAllLibrarian();
        setLibrarianList(data);
      } catch (error) {
        console.error('Error fetching librarian list:', error);
      }
    };

    fetchLibrarian();
  }, []);

  const columns = [
    { key: 'staffId', label: 'Staff ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (staff) => navigate(`/staff/${staff.staffId}`),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Librarians List</h1>
      <ReusableTable columns={columns} data={librarianList} actions={actions} />
    </div>
  );
};

export default LibrarianListPage;
