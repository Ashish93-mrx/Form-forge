import { useAuth } from "../../hooks/useAuth";
import { createForm } from "../../services/firestoreService";
import FormBuilder from "../../components/forms/FormBuilder/FormBuilder";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateFormPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <FormBuilder
      onSave={async (fields, settings, meta) => {
        if (!user) {
          toast.error("Please log in first.");
          
          return;
        }
        await createForm(user.uid, fields, settings, meta);
        toast.success(`Form created successfully!`);
        navigate("/dashboard"); 
      }}
    />
  );
}
