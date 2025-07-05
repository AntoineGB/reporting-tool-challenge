import React from "react";
import { Type, Image as ImageIcon, BarChart2, Table } from "lucide-react";

const paletteItems = [
  { type: "text", label: "Text", icon: Type },
  { type: "image", label: "Image", icon: ImageIcon },
  { type: "barchart", label: "Bar Chart", icon: BarChart2 },
  { type: "table", label: "Table", icon: Table },
];

function ElementPalette({ onAddElement }) {
  return (
    <div className="mt-6 p-3 bg-gray-950/60 border border-gray-800 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-400 mb-2">Add Element</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {paletteItems.map((item) => (
          <button
            key={item.type}
            onClick={() => onAddElement(item.type)}
            className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-blue-500/20 hover:text-blue-300 rounded-md transition-all border border-transparent hover:border-blue-500/30"
          >
            <item.icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ElementPalette;
