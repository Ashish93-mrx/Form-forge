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

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
}

export interface FormSettings {
  backgroundColor: string;
}

export interface FormData {
  id: string;
  title: string;       // public, visible on the form
  subtitle: string;    // internal/admin use
  fields: FormField[];
  settings: FormSettings;
  createdBy: string;
  createdAt: any;
}

export interface FormResponse {
  id?: string;
  [key: string]: any;
  submittedAt: any; // Firestore Timestamp
}
