import React from "react";
import { X } from "lucide-react";

// Wrapping report builder elements
function ElementWrapper({ element, onDelete, children }) {
  return (
    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 relative group">
      <button
        onClick={() => onDelete(element.id)}
        className="absolute top-2 right-2 p-1 bg-red-600/80 hover:bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Delete element"
      >
        <X size={14} />
      </button>
      {children}
    </div>
  );
}

export default ElementWrapper;
