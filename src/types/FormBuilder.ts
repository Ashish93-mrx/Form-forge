export type FormBuilderProps = {
  initialFields?: any[];
  initialSettings?: any;
  initialMeta?: { title: string; subtitle: string };
  onSave: (
    fields: any[],
    settings: any,
    meta: { title: string; subtitle: string },
  ) => void;
};

export type FieldType =
  | "short_text"
  | "long_text"
  | "email"
  | "phone"
  | "url"
  | "password"
  | "checkbox_group"
  | "radio_group"
  | "boolean"
  | "select"
  | "date"
  | "time"
  | "number"
  | "file";

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