import React from 'react';
import Sidebar from '../Shared/Sidebar';
import Header from '../Shared/Header';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const links = [
    { label: 'Add User', path: '/admin/register' },
    { label: 'Student Management', path: '/admin/students' },
    { label: 'Library Management', path: '/admin/library' },
    { label: 'Fees Management', path: '/admin/fees' },
  ];


  return (
    <div className="flex">
      <Sidebar links={links} />
      <main className="flex-grow p-6">
        <Header title="Admin Dashboard" />
        <section className="mt-4">
          <h2 className="text-xl font-bold">Welcome, Admin!</h2>
          
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
