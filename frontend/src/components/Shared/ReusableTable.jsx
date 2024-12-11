// ReusableTable.js
import React from 'react';

const ReusableTable = ({ columns, data, actions }) => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          {columns.map((column) => (
            <th
              key={column.key}
              className="border border-gray-300 px-4 py-2 text-left"
            >
              {column.label}
            </th>
          ))}
          {actions && (
            <th className="border border-gray-300 px-4 py-2 text-left">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td
                key={column.key}
                className="border border-gray-300 px-4 py-2"
              >
                {row[column.key]}
              </td>
            ))}
            {actions && (
              <td className="border border-gray-300 px-4 py-2">
                {actions.map(({ label, onClick }, actionIndex) => (
                  <button
                    key={actionIndex}
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => onClick(row)}
                  >
                    {label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReusableTable;
