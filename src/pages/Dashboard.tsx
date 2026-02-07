import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getFormResponses, deleteForm } from "../services/firestoreService";
import { useCSVExport } from "../hooks/useCSVExport";
import { Menu } from "@headlessui/react"; // Dropdown component
import { delete2, dots } from "../assets";

export default function Dashboard() {
  const { user } = useAuth();
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { exportToCSV } = useCSVExport();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");

  useEffect(() => {
    if (!user) return;

    const fetchForms = async () => {
      setLoading(true);
      const q = query(
        collection(db, "forms"),
        where("createdBy", "==", user.uid),
      );
      const snapshot = await getDocs(q);
      setForms(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };

    fetchForms();
  }, [user]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteForm(deleteId);
      setForms(forms.filter((form) => form.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error("Error deleting form:", err);
    }
  };

  const handleExport = async (formId: string, subtitle: string) => {
    const responses = await getFormResponses(formId);
    exportToCSV(responses, `${subtitle || "form"}-responses.csv`);
  };

  return (
    <div className="p-6 border-t font-Mont min-h-screen">
      <div className="rounded-xl p-6 bg-gradient-to-r from-blue-100 via-indigo-200 to-cyan-200 shadow-md">
        {/* Card content */}

        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Create Form Button */}
        <Link
          to="/form/create"
          className="group relative inline-flex items-center justify-center px-5 py-3 
             font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 
             rounded-lg shadow-md transition-all duration-200 
             hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg 
             active:scale-95"
        >
          <span className="mr-2 text-lg">+</span>
          <span>Create New Form</span>

          {/* Shine / ripple effect */}
          <span
            className="absolute inset-0 rounded-lg bg-white/20 opacity-0 
               group-hover:opacity-100 transition duration-300"
            aria-hidden="true"
          ></span>
        </Link>
      </div>
      <div className=" bg-gradient-to-b from-indigo-200 via-white p-5 mt-4">
        <h2 className="text-xl font-semibold mb-4 mt-4 text-gray-800">
          Your Forms
        </h2>

        {/* Loading shimmer */}
        {loading ? (
          <div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            role="status"
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="animate-pulse bg-gray-200 h-32 rounded-lg  p-5"
              ></div>
            ))}
          </div>
        ) : forms.length === 0 ? (
<div className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-white to-indigo-50 border border-dashed border-indigo-200 rounded-2xl py-14 px-6 shadow-sm">
  
  {/* Icon circle */}
  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-3xl mb-4 shadow-inner">
    📝
  </div>

  {/* Title */}
  <h3 className="text-xl font-semibold text-gray-800 mb-2">
    No forms yet
  </h3>

  {/* Subtitle */}
  <p className="text-gray-500 max-w-sm mb-6">
    You haven’t created any forms yet. Start building beautiful forms and
    collecting responses in seconds.
  </p>

  {/* CTA button */}
  <Link
    to="/form/create"
    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
    bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium
    shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-blue-700 
    active:scale-95 transition-all duration-200"
  >
    <span className="text-lg">＋</span>
    Create your first form
  </Link>

  {/* small helper text */}
  <p className="text-xs text-gray-400 mt-4">
    Takes less than 30 seconds ✨
  </p>
</div>

        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {forms.map((form) => (
              <div
                key={form.id}
                className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition rounded-xl p-5 flex flex-col justify-between"
              >
                {/* Form Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {form.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {form.subtitle || " "}
                  </p>
                  <a
                    href={`/form/${form.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-indigo-600 hover:text-indigo-800 text-sm font-medium transition"
                  >
                    🔗 Public Link
                  </a>
                </div>

                {/* Dropdown for actions */}
                <div className="mt-4 flex justify-between">
                  <div className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-indigo-700 transition">
                    <Link to={`/responses/${form.id}`}>View Responses</Link>
                  </div>

                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button
                      className="cursor-pointer"
                      aria-label="More actions for this form"
                    >
                      <img src={dots} className="w-5" />
                    </Menu.Button>

                    <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right bg-white border border-gray-100 rounded-lg shadow-lg ring-1 ring-opacity-5 focus:outline-none z-10">
                      <div className="">
                        {/* EDIT */}
                        <Menu.Item>
                          {({ active }: { active: boolean }) => (
                            <Link
                              to={`/form/${form.id}/edit`}
                              className={`block px-4 py-2 text-sm rounded-t-lg transition-colors duration-150 ${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              Edit
                            </Link>
                          )}
                        </Menu.Item>

                        {/* EXPORT */}
                        <Menu.Item>
                          {({ active }: { active: boolean }) => (
                            <button
                              onClick={() =>
                                handleExport(form.id, form.subtitle)
                              }
                              className={`block w-full cursor-pointer text-left px-4 py-2 text-sm ${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              Export CSV
                            </button>
                          )}
                        </Menu.Item>

                        {/* DELETE */}
                        <Menu.Item>
                          {({ active }: { active: boolean }) => (
                            <button
                              onClick={() => {
                                setDeleteId(form.id);
                                setDeleteName(form.title);
                              }}
                              className={`block w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 rounded-b-lg ${
                                active ? "bg-red-50" : ""
                              }`}
                            >
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>

                  {/* 🔴 Delete Confirmation Modal */}
                  {deleteId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                      {/* backdrop */}
                      <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setDeleteId(null)}
                      />

                      {/* modal */}
                      <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 animate-[fadeIn_.2s_ease]">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100">
                            <img src={delete2} className="w-5" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Delete Form?
                          </h3>
                        </div>

                        <p className="text-sm text-gray-600 mb-6">
                          Are you sure you want to delete{" "}
                          <span className="font-semibold text-gray-900">
                            {deleteName}
                          </span>
                          ?
                          <br />
                          <span className="text-red-500 text-xs">
                            This action cannot be undone.
                          </span>
                        </p>

                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setDeleteId(null)}
                            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={handleDelete}
                            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md cursor-pointer transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
