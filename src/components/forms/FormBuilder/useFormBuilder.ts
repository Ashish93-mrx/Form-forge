import { useState } from "react";
import { nanoid } from "nanoid";

export type FieldType =
  | "short_text"
  | "long_text"
  | "email"
  | "checkbox_group"
  | "radio_group"
  | "boolean"
  | "select"
  | "date"
  | "number";

// export type FormField = {
//   id: string;
//   label: string;
//   type: string;
//   required?: boolean;
//   options?: string[];
// };


export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

export interface FormSettings {
  backgroundColor: string;
}

export function useFormBuilder( initialFields: FormField[] = [],
  initialSettings: any = { backgroundColor: "#ffffff" },
  initialMeta: { title: string; subtitle: string } = {
    title: "Untitled Form",
    subtitle: "",
  }) {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [formSettings, setFormSettings] = useState(initialSettings);

    // ✅ new state for meta info
  const [formMeta, setFormMeta] = useState(initialMeta);

//   const updateBackgroundColor = (color: string) => {
//     setFormSettings(prev => ({ ...prev, backgroundColor: color }));
//   };

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: nanoid(),
      type,
      label: "Untitled Question",
      required: false,
      options: type.includes("group") || type === "select" ? ["Option 1"] : [],
    };
    setFields((prev) => [...prev, newField]);
  };

  const updateLabel = (id: string, newLabel: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, label: newLabel } : f))
    );
  };

  const updateOptions = (id: string, options: string[]) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, options } : f))
    );
  };

  const reorderFields = (newFields: FormField[]) => {
    setFields(newFields);
  };

  const updateBackgroundColor = (color: string) => {
    setFormSettings((prev: any) => ({ ...prev, backgroundColor: color }));
  };

  const removeField = (id: string) => {
  setFields(prev => prev.filter(f => f.id !== id));
};


  const updateTitle = (title: string) => setFormMeta((prev) => ({ ...prev, title }));
  const updateSubtitle = (subtitle: string) => setFormMeta((prev) => ({ ...prev, subtitle }));

  const toggleRequired = (id: string, required: boolean) => {
  setFields((prev) =>
    prev.map((f) => (f.id === id ? { ...f, required } : f))
  );
};

//   const reorderFields = (newOrder: FormField[]) => setFields(newOrder);

  return { fields, formSettings, formMeta, addField, updateLabel, updateOptions, reorderFields,updateTitle,
    updateSubtitle, updateBackgroundColor, removeField,toggleRequired };
}

