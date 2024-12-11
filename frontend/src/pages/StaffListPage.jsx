import React, { useEffect, useState } from 'react';
import { fetchAllStaff } from '../api/staff';
import { useNavigate } from 'react-router-dom';
import ReusableTable from '../components/Shared/ReusableTable';

const StaffListPage = () => {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await fetchAllStaff();
        setStaffList(data);
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };

    fetchStaff();
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
      <h1 className="text-2xl font-bold mb-4">Office Staff List</h1>
      <ReusableTable columns={columns} data={staffList} actions={actions} />
    </div>
  );
};

export default StaffListPage;
