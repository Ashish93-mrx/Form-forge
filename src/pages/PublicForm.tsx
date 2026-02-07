import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormById, saveFormResponse } from "../services/firestoreService";
import { success } from "../assets";

export default function PublicForm() {
  const { formId } = useParams();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!formId) return;
    getFormById(formId).then((data) => {
      setForm(data);
      setLoading(false);
    });
  }, [formId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-10 text-center">
            {/* Success line */}
            <div className="w-14 h-1 bg-green-500 mx-auto rounded-full mb-6"></div>

            {/* Title */}
            <div className="flex flex-row justify-center gap-1 items-center">
              <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mb-3">
                Submission received
              </h2>
              <img src={success} className="h-8 w-8" />
            </div>

            {/* Subtitle */}
            <p className="text-gray-600 leading-relaxed">
              Your response has been successfully recorded. You may now close
              this page.
            </p>
            {/* Divider */}
            <div className="my-8 border-t border-gray-100"></div>

            {/* Footer note */}
            <p className="text-sm text-gray-400">
              Thank you for taking the time to complete this form.
            </p>
          </div>

          {/* subtle branding footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Secure form submission
          </p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{form?.title}</h1>
        {form?.subtitle && (
          <p className="text-gray-600 mb-6">{form?.subtitle}</p>
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
                  <label
                    key={idx}
                    className="flex items-center space-x-2 text-gray-700 mb-1"
                  >
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
                  <label
                    key={idx}
                    className="flex items-center space-x-2 text-gray-700 mb-1"
                  >
                    <input
                      type="radio"
                      name={f.id}
                      value={opt}
                      className="w-5 h-5 cursor-pointer text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              {f.type === "select" && (
                <div className="relative" ref={dropdownRef}>
                  {/* Selected box */}
                  <div
                    onClick={() =>
                      setOpenDropdown(openDropdown === f.id ? null : f.id)
                    }
                    className="
      border border-gray-300 bg-white
      rounded-xl px-4 py-3
      flex justify-between items-center
      cursor-pointer
      hover:border-gray-400
      hover:shadow-sm
      transition-all
      "
                  >
                    <span
                      className={
                        values[f.id] ? "text-gray-800" : "text-gray-400"
                      }
                    >
                      {values[f.id] || "Select an option"}
                    </span>

                    {/* arrow */}
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        openDropdown === f.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Dropdown list */}
                  {openDropdown === f.id && (
                    <div
                      className="
        absolute z-50 mt-2 w-full
        bg-white border border-gray-200
        rounded-xl shadow-lg
        max-h-60 overflow-y-auto
        animate-fadeIn
      "
                    >
                      {f.options?.map((opt: string, idx: number) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setValues((prev) => ({ ...prev, [f.id]: opt }));
                            setOpenDropdown(null);
                          }}
                          className="
            px-4 py-3
            hover:bg-blue-50
            hover:text-blue-600
            cursor-pointer
            transition
            first:rounded-t-xl
            last:rounded-b-xl
            "
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* hidden input for submit */}
                  <input
                    type="hidden"
                    name={f.id}
                    value={values[f.id] || ""}
                    required={f.required}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-5 py-3 rounded-lg 
                     font-medium shadow-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
