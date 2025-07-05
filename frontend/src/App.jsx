// This is the main application component, setting up the two-column layout.

import React, { useEffect } from "react";
import ReportList from "./components/ReportList";
import ReportBuilder from "./components/ReportBuilder";
import useReportStore from "./store";

function App() {
  const fetchReports = useReportStore((state) => state.fetchReports);

  // Triggering the initial fetch.
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="bg-gray-900 text-gray-100 font-sans flex h-screen">
      {/* Left Sidebar for Report List */}
      <aside className="w-1/4 bg-gray-950/50 border-r border-gray-800 p-4 flex flex-col">
        <header className="mb-4 pb-2 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-blue-400">Report Builder</h1>
        </header>
        <ReportList />
      </aside>

      {/* Main Content Area for the Builder */}
      <main className="flex-1 p-6 overflow-y-auto">
        <ReportBuilder />
      </main>
    </div>
  );
}

export default App;
