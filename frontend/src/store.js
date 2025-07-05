import { create } from "zustand";

const API_URL_BASE = "http://localhost:8000/api/layouts";

const useReportStore = create((set, get) => ({
  // --- STATE ---
  reports: [],
  activeReport: null,
  loading: true,
  error: null,
  saveStatus: "idle", // 'idle', 'saving', 'error'

  // --- ACTIONS ---

  fetchReports: async () => {
    set({ loading: true });
    try {
      const response = await fetch(API_URL_BASE);
      if (!response.ok) throw new Error("Failed to fetch reports.");
      const data = await response.json();
      set({ reports: data, error: null, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setActiveReport: (report) => {
    set({ activeReport: report, saveStatus: "idle" });
  },

  // This action now ONLY updates the local state.
  updateActiveReport: (updatedFields) => {
    set((state) => {
      if (!state.activeReport) return {};
      return {
        activeReport: { ...state.activeReport, ...updatedFields },
      };
    });
  },

  // The save action, triggered manually by the save button.
  saveReport: async () => {
    const { activeReport } = get();
    if (!activeReport) return;

    set({ saveStatus: "saving" });
    const { id, name, content } = activeReport;
    const isNewReport = !id;
    const method = isNewReport ? "POST" : "PUT";
    const url = isNewReport ? API_URL_BASE : `${API_URL_BASE}/${id}`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
      });
      if (!response.ok) throw new Error("Failed to save the report.");

      const savedReport = await response.json();

      set((state) => ({
        activeReport: savedReport,
        saveStatus: "idle", // Reset status after successful save
        reports: isNewReport
          ? [...state.reports, savedReport]
          : state.reports.map((r) =>
              r.id === savedReport.id ? savedReport : r
            ),
      }));
      return true; // Indicate success
    } catch (error) {
      set({ saveStatus: "error" });
      console.error(error);
      return false; // Indicate failure
    }
  },

  deleteReport: async (reportId) => {
    if (
      !reportId ||
      !window.confirm("Are you sure you want to delete this report?")
    )
      return;
    try {
      await fetch(`${API_URL_BASE}/${reportId}`, { method: "DELETE" });
      set((state) => ({
        reports: state.reports.filter((r) => r.id !== reportId),
        activeReport: null,
      }));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  },
}));

export default useReportStore;
