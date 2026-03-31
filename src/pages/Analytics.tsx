import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getFormResponses } from "../services/firestoreService";
import { Link } from "react-router-dom";
import { back, link } from "../assets";

interface FormAnalytics {
  id: string;
  title: string;
  totalResponses: number;
  createdAt: Date;
  responseRate: number;
}

export default function Analytics() {
  const { user } = useAuth();
  const [formsAnalytics, setFormsAnalytics] = useState<FormAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalForms, setTotalForms] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  const [averageResponsesPerForm, setAverageResponsesPerForm] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "forms"),
          where("createdBy", "==", user.uid)
        );
        const formsSnapshot = await getDocs(q);
        const forms = formsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let totalResp = 0;
        const analyticsData: FormAnalytics[] = [];

        for (const form of forms) {
          const responses = await getFormResponses(form.id);
          totalResp += responses.length;
          analyticsData.push({
            id: form.id,
            title: form.title || "Untitled Form",
            totalResponses: responses.length,
            createdAt: form.createdAt?.toDate?.() || new Date(),
            responseRate: 0, 
          });
        }

        setTotalForms(forms.length);
        setTotalResponses(totalResp);
        setAverageResponsesPerForm(
          forms.length > 0 ? Math.round(totalResp / forms.length) : 0
        );
        setFormsAnalytics(
          analyticsData.sort(
            (a, b) => b.totalResponses - a.totalResponses
          )
        );
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 font-Mont">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/dashboard" className="hover:text-indigo-600 font-medium">
              Dashboard
            </Link>
            <span>›</span>
            <span className="text-gray-800 font-semibold">Analytics</span>
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

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Forms Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Forms</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {totalForms}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Responses Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Responses
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {totalResponses}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Average Responses Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Avg. Responses
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {averageResponsesPerForm}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Forms Breakdown */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Forms Breakdown
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Response statistics for each of your forms
            </p>
          </div>

          <div className="overflow-x-auto">
            {formsAnalytics.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">
                  No forms yet. Create your first form to see analytics.
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Form Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Responses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {formsAnalytics.map((form) => (
                    <tr
                      key={form.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">
                          {form.title}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{
                                width: `${Math.min(
                                  (form.totalResponses / (Math.max(...formsAnalytics.map(f => f.totalResponses), 1))) * 100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="ml-3 font-semibold text-gray-700">
                            {form.totalResponses}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {form.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/form/${form.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md 
                          bg-blue-50 text-blue-600 hover:bg-blue-100 
                          text-xs font-medium transition"
                          >
                            <img src={link} className="h-3 w-3" />
                            View Form
                          </Link>
                          <Link
                            to={`/form/${form.id}/responses`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md 
                          bg-indigo-50 text-indigo-600 hover:bg-indigo-100 
                          text-xs font-medium transition"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            View Responses
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        {formsAnalytics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Most Responses */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Top Performing Form
              </h3>
              {formsAnalytics[0] && (
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="text-gray-600 text-sm">Form</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {formsAnalytics[0].title}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    {formsAnalytics[0].totalResponses} responses
                  </p>
                </div>
              )}
            </div>

            {/* Total Engagement */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Total Engagement
              </h3>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-600 text-sm">Forms & Responses</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {totalForms + totalResponses}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Combined forms and responses
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
