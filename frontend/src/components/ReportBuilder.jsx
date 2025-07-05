import React from "react";
import useReportStore from "../store";
import ElementPalette from "./ElementPalette";
import TextElement from "./elements/TextElement";
import ImageElement from "./elements/ImageElement";
import BarChartElement from "./elements/BarChartElement";
import TableElement from "./elements/TableElement";
import { Save, Trash2, Eye, Edit, Dices } from "lucide-react";

const elementComponentMap = {
  text: TextElement,
  image: ImageElement,
  barchart: BarChartElement,
  table: TableElement,
};

// A simple utility function to shuffle an array
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

function ReportBuilder() {
  const {
    activeReport,
    updateActiveReport,
    deleteReport,
    saveReport,
    saveStatus,
  } = useReportStore();

  if (!activeReport) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-gray-600">
          Select a report or create a new one to begin.
        </h2>
      </div>
    );
  }

  const handleRandomPopulate = () => {
    const baseElements = [
      {
        id: crypto.randomUUID(),
        type: "text",
        value: "Quarterly Performance Overview",
      },
      {
        id: crypto.randomUUID(),
        type: "image",
        src: "[https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop)",
      },
      {
        id: crypto.randomUUID(),
        type: "barchart",
        title: "Revenue by Department",
      },
      {
        id: crypto.randomUUID(),
        type: "table",
        headers: ["Region", "Manager", "Q2 Sales"],
        rows: [],
      },
    ];
    updateActiveReport({ content: shuffleArray(baseElements) });
  };

  const handleSaveClick = async () => await saveReport();
  const addElement = (type) => {
    const newElement = {
      id: crypto.randomUUID(),
      type,
      ...(type === "text" && { value: "New Text Block" }),
      ...(type === "image" && {
        src: "[https://placehold.co/600x400/27272a/9ca3af?text=Placeholder](https://placehold.co/600x400/27272a/9ca3af?text=Placeholder)",
      }),
      ...(type === "barchart" && { title: "New Bar Chart" }),
      ...(type === "table" && { headers: ["Header 1", "Header 2"], rows: [] }),
    };
    updateActiveReport({ content: [...activeReport.content, newElement] });
  };
  const updateElement = (id, updatedValue) => {
    updateActiveReport({
      content: activeReport.content.map((el) =>
        el.id === id ? { ...el, ...updatedValue } : el
      ),
    });
  };
  const deleteElement = (id) => {
    updateActiveReport({
      content: activeReport.content.filter((el) => el.id !== id),
    });
  };

  return (
    <div className="relative h-full">
      <div className="flex justify-between items-start mb-6 gap-4">
        <input
          type="text"
          value={activeReport.name}
          onChange={(e) => updateActiveReport({ name: e.target.value })}
          className="text-3xl font-bold text-gray-300 bg-transparent border-b-2 border-transparent focus:border-blue-500 focus:outline-none flex-grow"
          placeholder="Report Name"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveClick}
            disabled={saveStatus === "saving"}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-gray-500"
          >
            <Save size={16} />
            {saveStatus === "saving" ? "Saving..." : "Save"}
          </button>
          {activeReport.id && (
            <button
              onClick={() => deleteReport(activeReport.id)}
              className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-md"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>

      <div
        className={`bg-gray-800/50 border border-dashed border-gray-600 rounded-lg p-4 min-h-[60vh]`}
      >
        {activeReport.content.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Add elements to your report using the palette below.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeReport.content.map((element) => {
              const ElementComponent = elementComponentMap[element.type];
              return ElementComponent ? (
                <ElementComponent
                  key={element.id}
                  element={element}
                  onUpdate={updateElement}
                  onDelete={deleteElement}
                />
              ) : null;
            })}
          </div>
        )}
      </div>

      <ElementPalette onAddElement={addElement} />

      {/* Floating Action Button */}
      <button
        onClick={handleRandomPopulate}
        className="absolute bottom-12 right-6 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110"
        title="Randomly populate report"
      >
        <Dices size={24} />
      </button>
    </div>
  );
}

export default ReportBuilder;
