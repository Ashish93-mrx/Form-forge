import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormById, getFormResponses } from "../services/firestoreService";
import Papa from "papaparse";

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
      setLoading(false);
    };

    fetchData();
  }, [formId]);

  const handleDownloadCSV = () => {
    if (!responses.length || !form) return;

    // Map responses to rows based on form.fields order
    const rows = responses.map((resp) => {
      const row: Record<string, any> = {};
      form.fields.forEach((f: any) => {
        const answer = resp.responses.find((r: any) => r.id === f.id);
        row[f.label] = Array.isArray(answer?.value)
          ? answer.value.join(", ")
          : answer?.value ?? "";
      });
      row["Submitted At"] = resp.submittedAt?.toDate?.().toISOString?.() || "";
      return row;
    });

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${form.meta?.title || "form"}-responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // if (loading)
  //   return (
  // <div className="p-8 bg-gray-50 min-h-screen">
  //   <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] overflow-y-auto border border-gray-200">
  //     <div className="relative overflow-x-auto shadow-md sm:rounded-lg animate-pulse">
  //       <table className="w-full text-sm text-left text-gray-500">
  //         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
  //           <tr>
  //             {Array.from({ length: 6 }).map((_, i) => (
  //               <th key={i} scope="col" className="px-6 py-3">
  //                 <div className="h-3 bg-gray-200 rounded w-20"></div>
  //               </th>
  //             ))}
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {Array.from({ length: 5 }).map((_, rowIdx) => (
  //             <tr key={rowIdx} className="bg-white border-b">
  //               {Array.from({ length: 6 }).map((_, colIdx) => (
  //                 <td key={colIdx} className="px-6 py-4">
  //                   <div className="h-4 bg-gray-200 rounded w-full"></div>
  //                 </td>
  //               ))}
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // </div>
  // );

  // if 

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">{form?.meta?.title}</h1>
        <p className="text-gray-600 mt-1">{form?.meta?.subtitle}</p>
      </div>

      {/* Download button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Responses</h2>
        <button
          onClick={handleDownloadCSV}
          disabled={!responses.length}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 
             hover:from-green-600 hover:to-green-700 text-white font-medium px-5 py-2.5 
             rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
             focus:outline-none focus:ring-2 focus:ring-green-400 transition-all
             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          Download CSV
        </button>

      </div>


      {/* Responses Table */}
      {(loading) ? (<div className="p-8 bg-gray-50 min-h-screen">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] overflow-y-auto border border-gray-200">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg animate-pulse">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <th key={i} scope="col" className="px-6 py-3">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, rowIdx) => (
                  <tr key={rowIdx} className="bg-white border-b">
                    {Array.from({ length: 6 }).map((_, colIdx) => (
                      <td key={colIdx} className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>) : (!form) ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500 font-medium">Form not found.</p>
        </div>
      ) : (responses.length === 0) ? (
        <div className="flex flex-col items-center justify-center bg-white border border-dashed border-gray-300 rounded-lg py-12">
          <p className="text-gray-500 text-lg">No responses yet.</p>
          <p className="text-sm text-gray-400 mt-1">
            Share your form link to start collecting responses 🚀
          </p>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] overflow-y-auto border border-gray-200">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">#</th>
                {form.fields.map((f: any) => (
                  <th key={f.id} className="px-4 py-3 whitespace-nowrap">
                    {f.label}
                  </th>
                ))}
                <th className="px-4 py-3">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {responses.length === 0 ? (
                <tr>
                  <td
                    colSpan={form.fields.length + 2}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No responses yet.
                  </td>
                </tr>
              ) : (
                responses.map((resp, idx) => (
                  <tr
                    key={resp.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {idx + 1}
                    </td>
                    {form.fields.map((f: any) => {
                      const answer = resp.responses.find(
                        (r: any) => r.id === f.id
                      );
                      return (
                        <td key={f.id} className="px-4 py-3">
                          {Array.isArray(answer?.value)
                            ? answer.value.join(", ")
                            : String(answer?.value ?? "")}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {resp.submittedAt?.toDate?.().toLocaleString?.() || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
