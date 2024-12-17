import React from "react";

const ReusableTable = ({ columns, data, actions }) => {
  return (
    <div className="overflow-auto rounded-lg shadow-lg">
      <table className="w-full bg-white">
        {/* Table Header */}
        <thead className="bg-slate-500 text-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            {actions?.length > 0 && (
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="even:bg-gray-50 odd:bg-white hover:bg-gray-100"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {row[column.key] || "-"}
                  </td>
                ))}
                {actions?.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {actions.map(({ label, onClick, className }, actionIndex) => (
                      <button
                        key={actionIndex}
                        className={`text-sm text-blue-600 hover:text-blue-800 underline mr-2 ${className || ""}`}
                        onClick={() => onClick(row)}
                      >
                        {label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions?.length ? 1 : 0)}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
