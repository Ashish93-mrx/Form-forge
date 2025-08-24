import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFormById, updateForm } from "../services/firestoreService";
import FormBuilder from "../components/forms/FormBuilder/FormBuilder";
import type { FormField } from "../types";
import { toast } from "sonner";

export default function EditForm() {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();

  interface FormData {
  title: string;
  subtitle: string;
  fields: FormField[];
  settings: { backgroundColor: string };
}
const [formData, setFormData] = useState<FormData | null>(null);

//   const [formData, setFormData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;

    const fetchForm = async () => {
      setLoading(true);
      const form = await getFormById(formId);
      setFormData(form);
      setLoading(false);
    };

    fetchForm();
  }, [formId]);

  const handleSave = async (
    fields: any[],
    settings: any,
    meta: { title: string; subtitle: string }
  ) => {
    if (!formId) return;

    try {
      await updateForm(formId, {
        title: meta.title,
        subtitle: meta.subtitle,
        fields,
        settings,
      });

      toast.success("Form updated successfully!");
      navigate("/dashboard");
    } catch (error) {
     toast.error("Failed to update form.");
    }
  };

  if (loading) {
    return (
          <div className="p-6 max-w-5xl mx-auto animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-5/6"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>);
  }

  if (!formData) {
    return <p className="text-center py-10">Form not found.</p>;
  }

  return (
    // <div className="p-6 max-w-5xl mx-auto">
    <div>
      <h1 className="text-2xl mt-4 ml-4 font-bold mb-6">Edit Form</h1>
      <FormBuilder
        onSave={handleSave}
        initialFields={formData.fields || []}
        initialSettings={formData.settings || { backgroundColor: "#ffffff" }}
        initialMeta={{
          title: formData.title || "Untitled Form",
          subtitle: formData.subtitle || "",
        }}
      />
    </div>
  );
}
