import React from 'react';
import Sidebar from '../components/Shared/Sidebar';
import Header from '../components/Shared/Header';
import { useNavigate } from 'react-router-dom';

const StudentManagement = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'OfficeStaff Management', path: '/admin/OfficeStaff' },
    { label: 'Student Management', path: '/admin/students' },
    { label: 'Library Management', path: '/admin/library' },
    { label: 'Fees Management', path: '/admin/fees' },
  ];

  return (
    <div className="flex">
      <Sidebar links={links} />
      <main className="flex-grow p-6">
        <Header title="Office Staff Management" />
        <section className="mt-4">
          <button
            onClick={() => navigate('/students/studentform')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Student
          </button>
          <button
          onClick={() => navigate('/students/studentlist')}
           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-4">
            Manage Students
          </button>
        </section>
      </main>
    </div>
  );
};

export default StudentManagement;
