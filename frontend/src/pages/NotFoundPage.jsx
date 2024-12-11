import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-4">Sorry, the page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="text-blue-500 hover:underline"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
