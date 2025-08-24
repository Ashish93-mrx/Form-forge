import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getFormResponses, deleteForm } from "../services/firestoreService";
import { useCSVExport } from "../hooks/useCSVExport";
import { Menu } from "@headlessui/react"; // Dropdown component

export default function Dashboard() {
  const { user } = useAuth();
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { exportToCSV } = useCSVExport();

  useEffect(() => {
    if (!user) return;

    const fetchForms = async () => {
      setLoading(true);
      const q = query(collection(db, "forms"), where("createdBy", "==", user.uid));
      const snapshot = await getDocs(q);
      setForms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };

    fetchForms();
  }, [user]);

  const handleDelete = async (formId: string) => {
    if (!window.confirm("Are you sure you want to delete this form? This cannot be undone.")) {
      return;
    }
    try {
      await deleteForm(formId);
      setForms(forms.filter((form) => form.id !== formId));
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

      <h2 className="text-xl font-semibold mb-4 mt-4 text-gray-800">Your Forms</h2>

      {/* Loading shimmer */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" role="status">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="animate-pulse bg-gray-200 h-32 rounded-lg  p-5"
            ></div>
          ))}
        </div>
      ) : forms.length === 0 ? (
        <p className="text-gray-500 text-center bg-gray-50 border border-dashed border-gray-300 rounded-lg py-8">
          No forms created yet.
          <span className="block text-sm mt-1">
            Click <b>Create New Form</b> to get started 🚀
          </span>
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {forms.map((form) => (
            <div
              key={form.id}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-lg p-5 flex flex-col justify-between"
            >
              {/* Form Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{form.title}</h3>
                <p className="text-sm text-gray-500 mb-3 truncate">
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
                <div className="px-3 py-1.5 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium">

                  <Link
                    to={`/responses/${form.id}`}
                  >
                    View Responses
                  </Link>
                </div>

                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="px-3 py-1.5 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium" aria-label="More actions for this form">
                    ⋮
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-10">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }: { active: boolean }) => (
                          <Link
                            to={`/form/${form.id}/edit`}
                            className={`block px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                              }`}
                          >
                            Edit
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }: { active: boolean }) => (
                          <button
                            onClick={() => handleExport(form.id, form.subtitle)}
                            className={`block w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                              }`}
                          >
                            Export CSV
                          </button>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }: { active: boolean }) => (
                          <button
                            onClick={() => handleDelete(form.id)}
                            className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${active ? "bg-red-50" : ""
                              }`}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>

                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      )}
            </div>
    </div>
  );
}
