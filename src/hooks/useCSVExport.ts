import Papa from "papaparse";
import { toast } from "sonner";

export const useCSVExport = () => {
  const exportToCSV = (data: any[], filename = "export.csv") => {
    if (!data || data.length === 0) {
      toast.error("No data to export!");
      return;
    }

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { exportToCSV };
};
