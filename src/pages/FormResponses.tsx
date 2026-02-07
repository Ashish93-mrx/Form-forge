import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFormById, getFormResponses } from "../services/firestoreService";
import Papa from "papaparse";
import { back } from "../assets";

export default function FormResponses() {
  const { formId } = useParams();
  const [form, setForm] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;

    const fetchData = async () => {
      setLoading(true);
      const f = await getFormById(formId);
      const r = await getFormResponses(formId);
      setForm(f);
      setResponses(r);
      console.log(r, "ioio");
      setLoading(false);
    };

    fetchData();
  }, [formId]);

  const handleDownloadCSV = () => {
    if (!responses.length || !form) return;

    const rows = responses.map((resp) => {
      const row: Record<string, any> = {};
      form.fields.forEach((f: any) => {
        const answer = resp.responses.find((r: any) => r.id === f.id);
        row[f.label] = Array.isArray(answer?.value)
          ? answer.value.join(", ")
          : (answer?.value ?? "");
      });
      row["Submitted At"] = resp.submittedAt?.toDate?.().toISOString?.() || "";
      return row;
    });

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${form.meta?.title || "form"}-responses.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/dashboard" className="hover:text-indigo-600 font-medium">
              Dashboard
            </Link>
            <span>›</span>
            <span className="text-gray-800 font-semibold">Responses</span>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg 
          bg-white border border-gray-200 hover:bg-gray-100 
          text-sm font-medium shadow-sm transition"
          >
            <img src={back} className="h-4" />
            Back
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {form?.title || "Form"}
          </h1>
          <p className="text-gray-500 mt-1">
            {form?.subtitle || "Responses collected from this form"}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Responses ({responses.length})
          </h2>

          <button
            onClick={handleDownloadCSV}
            disabled={responses.length==0}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 
          hover:from-green-600 hover:to-green-700 text-white font-medium px-5 py-2.5 
          rounded-lg cursor-pointer shadow-sm transition disabled:opacity-40"
          >
            Download CSV
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Loading responses...</p>
            <p className="text-xs text-gray-400 mt-1">
              Fetching data from database
            </p>
          </div>
        ) : !form ? (
          <div className="text-center py-20 text-red-500 font-medium">
            Form not found.
          </div>
        ) : responses.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white border border-dashed border-gray-300 rounded-xl py-16 shadow-sm">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-700 font-semibold">No responses yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Share your form link to start collecting responses
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="sticky top-0 bg-gray-50 text-xs text-gray-600 uppercase border-b">
                  <tr>
                    <th className="px-5 py-3">#</th>
                    {form.fields.map((f: any) => (
                      <th key={f.id} className="px-5 py-3 whitespace-nowrap">
                        {f.label}
                      </th>
                    ))}
                    <th className="px-5 py-3 whitespace-nowrap">Submitted</th>
                  </tr>
                </thead>

                <tbody>
                  {responses.map((resp, idx) => (
                    <tr
                      key={resp.id}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-3 font-medium text-gray-700">
                        {idx + 1}
                      </td>

                      {form.fields.map((f: any) => {
                        const answer = resp.responses.find(
                          (r: any) => r.id === f.id,
                        );
                        return (
                          <td key={f.id} className="px-5 py-3 text-gray-700">
                            {Array.isArray(answer?.value)
                              ? answer.value.join(", ")
                              : String(answer?.value ?? "")}
                          </td>
                        );
                      })}

                      <td className="px-5 py-3 text-xs text-gray-400 whitespace-nowrap">
                        {resp.submittedAt?.toDate?.().toLocaleString?.() ||
                          "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}