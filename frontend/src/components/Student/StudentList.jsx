import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Class</th>
          <th className="border border-gray-300 px-4 py-2">Age</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td className="border border-gray-300 px-4 py-2">{student.name}</td>
            <td className="border border-gray-300 px-4 py-2">{student.class}</td>
            <td className="border border-gray-300 px-4 py-2">{student.age}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => onEdit(student)}
                className="btn-secondary mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(student.id)}
                className="btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
