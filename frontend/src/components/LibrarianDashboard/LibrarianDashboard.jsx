import React from 'react';
import Sidebar from '../Shared/Sidebar';
import Header from '../Shared/Header';

const LibrarianDashboard = () => {
  const links = [
    { label: 'Manage Library', path: '/librarian/library' },
  ];

  return (
    <div className="flex">
      <Sidebar links={links} />
      <main className="flex-grow p-6">
        <Header title="Librarian Dashboard" />
        <section className="mt-4">
          <h2 className="text-xl font-bold">Welcome, Librarian!</h2>
        </section>
      </main>
    </div>
  );
};

export default LibrarianDashboard;
