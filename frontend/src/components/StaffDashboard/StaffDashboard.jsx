import React from 'react';
import Sidebar from '../Shared/Sidebar';
import Header from '../Shared/Header';

const StaffDashboard = () => {
  const links = [
    { label: 'Manage Fees', path: '/staff/fees' },
    { label: 'Library Records', path: '/staff/library' },
    { label: 'Manage Students', path: '/students' }
  ];

  return (
    <div className="flex">
      <Sidebar links={links} />
      <main className="flex-grow p-6">
        <Header title="Staff Dashboard" />
        <section className="mt-4">
          <h2 className="text-xl font-bold">Welcome, Office Staff!</h2>
        </section>
      </main>
    </div>
  );
};

export default StaffDashboard;
