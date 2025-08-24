import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormById, saveFormResponse } from "../services/firestoreService";

export default function PublicForm() {
    const { formId } = useParams();
    const [form, setForm] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!formId) return;
        getFormById(formId).then((data) => {
            setForm(data);
            setLoading(false);
        });
    }, [formId]);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const responses: Array<{ id: string; label: string; value: any }> = [];

  for (const f of form.fields) {
    const el = (e.target as any)[f.id];
    console.log("Field Element:", el);
    if (!el) continue;

    let value: any;
    if (f.type === "checkbox_group") {
      value = Array.from(el as NodeListOf<HTMLInputElement>)
        .filter((c) => c.checked)
        .map((c) => c.value);
    } else if (f.type === "radio_group") {
      const radios = el as NodeListOf<HTMLInputElement>;
      const checked = Array.from(radios).find((c) => c.checked);
      value = checked ? checked.value : null;
    } else if (f.type === "boolean") {
      value = (el as HTMLInputElement).checked;
    } else {
      value = (el as HTMLInputElement).value;
    }

    responses.push({
      id: f.id,
      label: f.label,
      value,
    });
  }

  await saveFormResponse(formId!, {
    responses, // <-- array instead of object
    submittedAt: new Date(),
  });
  setSubmitted(true);
};

if (loading)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

if (!form)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-600 text-lg">❌ Form not found.</p>
    </div>
  );

if (submitted)
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
      <div className="bg-green-100 border border-green-300 text-green-700 px-6 py-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-2">🎉 Thank you!</h2>
        <p className="text-gray-700">Your response has been successfully submitted.</p>
      </div>
    </div>
  );

return (
  <div
    className="min-h-screen flex items-center justify-center px-4 py-10"
    style={{ backgroundColor: form.settings?.backgroundColor || "#f9fafb" }}
  >
    <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      {/* 🔹 Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{form.meta?.title}</h1>
      {form.meta?.subtitle && (
        <p className="text-gray-600 mb-6">{form.meta.subtitle}</p>
      )}

      {/* 🔹 Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {form.fields.map((f: any) => (
          <div key={f.id}>
            <label className="block mb-1 font-medium text-gray-800">
              {f.label}
              {f.required && <span className="text-red-500"> *</span>}
            </label>

            {f.type === "short_text" && (
              <input
                name={f.id}
                type="text"
                required={f.required}
                className="border border-gray-300 rounded-lg p-3 w-full 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            )}
            {f.type === "long_text" && (
              <textarea
                name={f.id}
                required={f.required}
                rows={4}
                className="border border-gray-300 rounded-lg p-3 w-full 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            )}
            {f.type === "email" && (
              <input
                name={f.id}
                type="email"
                required={f.required}
                className="border border-gray-300 rounded-lg p-3 w-full 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            )}
            {f.type === "number" && (
              <input
                name={f.id}
                type="number"
                required={f.required}
                className="border border-gray-300 rounded-lg p-3 w-full 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            )}
            {f.type === "date" && (
              <input
                name={f.id}
                type="date"
                required={f.required}
                className="border border-gray-300 rounded-lg p-3 w-full 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            )}
            {f.type === "boolean" && (
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  name={f.id}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>Yes</span>
              </label>
            )}
            {f.type === "checkbox_group" &&
              f.options?.map((opt: string, idx: number) => (
                <label key={idx} className="flex items-center space-x-2 text-gray-700 mb-1">
                  <input
                    type="checkbox"
                    name={f.id}
                    value={opt}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            {f.type === "radio_group" &&
              f.options?.map((opt: string, idx: number) => (
                <label key={idx} className="flex items-center space-x-2 text-gray-700 mb-1">
                  <input
                    type="radio"
                    name={f.id}
                    value={opt}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            {f.type === "select" && (
              <select
                name={f.id}
                required={f.required}
                className="border border-gray-300 rounded-lg p-3 w-full 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {f.options?.map((opt: string, idx: number) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg 
                     font-medium shadow-md transition"
        >
          Submit
        </button>
      </form>
    </div>
  </div>

    );
}
