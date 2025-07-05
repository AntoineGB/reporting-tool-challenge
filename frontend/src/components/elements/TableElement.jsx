import React from "react";
import ElementWrapper from "./ElementWrapper";

function TableElement({ element, onUpdate, onDelete }) {
  return (
    <ElementWrapper element={element} onDelete={onDelete}>
      <div className="p-2">
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  header
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td colSpan={1} className="px-6 py-4 text-center">
                  Table content
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ElementWrapper>
  );
}

export default TableElement;
