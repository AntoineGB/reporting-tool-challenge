import React from "react";
import useReportStore from "../store";
import { PlusCircle, FileText } from "lucide-react";

function ReportList() {
  const { reports, activeReport, loading, error, setActiveReport } =
    useReportStore();

  const handleNewReport = () => {
    setActiveReport({ id: null, name: "New Untitled Report", content: [] });
  };

  return (
    <div className="flex flex-col h-full">
      <button
        onClick={handleNewReport}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-colors mb-4"
      >
        <PlusCircle size={18} /> New Report
      </button>
      <div className="flex-grow overflow-y-auto pr-2">
        {loading && (
          <p className="text-gray-500 text-sm text-center">
            Loading reports...
          </p>
        )}
        {error && (
          <p className="text-red-400 text-sm text-center">Error: {error}</p>
        )}
        {!loading &&
          !error &&
          reports.map((report) => (
            <div
              key={report.id}
              onClick={() => setActiveReport(report)}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                activeReport?.id === report.id
                  ? "bg-blue-500/20 text-blue-300"
                  : "hover:bg-gray-800"
              }`}
            >
              <FileText size={16} className="flex-shrink-0" />
              <span className="truncate text-sm">{report.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReportList;
