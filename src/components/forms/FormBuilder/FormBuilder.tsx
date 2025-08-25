import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFormBuilder } from "./useFormBuilder";
import FieldItem from "./FieldItem";
import SortableField from "./SortableField";

const FIELD_TYPES = [
  { type: "short_text" as const, label: "Short Text" },
  { type: "long_text" as const, label: "Paragraph" },
  { type: "email" as const, label: "Email" },
  { type: "checkbox_group" as const, label: "Checkboxes" },
  { type: "radio_group" as const, label: "Multiple Choice" },
  { type: "boolean" as const, label: "Yes/No" },
  { type: "select" as const, label: "Dropdown" },
  { type: "date" as const, label: "Date" },
  { type: "number" as const, label: "Number" },
];

type FormBuilderProps = {
  initialFields?: any[];
  initialSettings?: any;
  initialMeta?: { title: string; subtitle: string };
  onSave: (fields: any[], settings: any, meta: { title: string; subtitle: string }) => void;
};

export default function FormBuilder({
  onSave,
  initialFields = [],
  initialSettings = { backgroundColor: "#ffffff" },
  initialMeta = { title: "Untitled Form", subtitle: "" },
}: FormBuilderProps) {
  const {
    fields,
    formSettings,
    formMeta,
    updateBackgroundColor,
    updateLabel,
    updateOptions,
    updateTitle,
    updateSubtitle,
    removeField,
    addField,
    reorderFields,
    toggleRequired
  } = useFormBuilder(initialFields, initialSettings, initialMeta);

  const handlePublish = () => {
    // sanitize
    const safeFields = fields.map((f) => ({
      ...f,
      options: f.options ?? [],
    }));

    const safeMeta = {
      title: formMeta.title || "Untitled Form",
      subtitle: formMeta.subtitle || "",
    };

    const safeSettings = {
      backgroundColor: formSettings.backgroundColor || "#ffffff",
    };

    onSave(safeFields, safeSettings, safeMeta);
  };



  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over?.id);
      reorderFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  return (
    <div className="bg-gray-150 p-2 h-lvh">

      <div className="grid font-Mont grid-cols-1 md:grid-cols-[40%_60%] gap-1">
        {/* 🔹 Left: Controls with vertical scroll */}
        <div
          className="bg-white shadow-md rounded-lg px-6 pt-2 border border-gray-200 
             max-h-[90vh] overflow-y-auto flex flex-col
             scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 
             hover:scrollbar-thumb-gray-500"
        >
          {/* Title & Subtitle */}
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Form Settings</h2>
          <label htmlFor="formTitle" className="block font-medium text-gray-700 mb-1">
            Company / Project Name
          </label>
          <input
            type="text"
            value={formMeta.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full mb-3 
                 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={formMeta.subtitle}
            onChange={(e) => updateSubtitle(e.target.value)}
            placeholder="Form Purpose (e.g., Job Application, Survey)"
            className="border border-gray-300 rounded-md p-3 w-full mb-6 
                 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Background Picker */}
          <label className="block font-medium text-gray-700 mb-2">
            Form Background Color:
          </label>
          <div className="flex items-center gap-2 mb-6">
            <input
              type="color"
              value={formSettings.backgroundColor}
              onChange={(e) => updateBackgroundColor(e.target.value)}
              className="w-12 h-10 p-1 rounded cursor-pointer"
            />
            <input
              type="text"
              value={formSettings.backgroundColor}
              onChange={(e) => updateBackgroundColor(e.target.value)}
              className="w-28 border rounded px-2 py-1 text-sm font-mono"
              placeholder="#ffffff"
            />
          </div>


          {/* Add Fields */}
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Add Fields</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {FIELD_TYPES.map((ft) => (
              <button
                key={ft.type}
                onClick={() => addField(ft.type)}
                className="bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 
                     px-3 py-2 rounded-md text-sm transition"
              >
                {ft.label}
              </button>
            ))}
          </div>

          {/* Your Form Fields */}
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Your Form</h2>
          <div className="space-y-3 flex-1">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext
                items={fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field) => (
                  <SortableField key={field.id} id={field.id}>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3 hover:shadow transition">
                      <FieldItem
                        field={field}
                        onLabelChange={updateLabel}
                        onOptionChange={updateOptions}
                        onRemove={removeField}
                        onToggleRequired={toggleRequired} 
                      />
                    </div>
                  </SortableField>
                ))}
              </SortableContext>
            </DndContext>
          </div>

          {/* Fixed Sticky Action Buttons */}
          <div className="mt-6 sticky bottom-0 bg-white py-4 border-t border-gray-200 flex gap-3 ">
            {/* <button
        onClick={() => onSave(fields)}
        className="flex-1 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition"
      >
        Save Form
      </button> */}
            <button
              onClick={handlePublish}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
            >
              Publish Form
            </button>
          </div>
        </div>

        {/* 🔹 Right: Live Preview with vertical scroll */}
        <div
          style={{ backgroundColor: formSettings.backgroundColor }}
          className="p-7 shadow-inner border border-gray-200 max-h-[100vh] overflow-y-auto justify-center"
        >
          <div className="flex items-center justify-center">

            <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

              <h2 className="font-bold text-2xl mb-2 text-gray-900">{formMeta.title}</h2>
              <p className="text-gray-600 mb-6">{formMeta.subtitle}</p>

              <form className="space-y-5">
                {fields.map((f) => (
                  <div key={f.id}>
                    <label htmlFor={`field-${f.id}`} className="block mb-1 font-medium text-gray-700">{f.label}</label>

                    {f.type === "long_text" && (
                      <textarea className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                                   required={f.required} 
                                  />
                    )}
                    {f.type === "short_text" && (
                      <input type="text" className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                                   required={f.required} 
                                  />
                    )}
                    {f.type === "email" && (
                      <input type="email" className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                                   required={f.required} 
                                 />
                    )}
                    {f.type === "date" && (
                      <input type="date" className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                                   required={f.required} 
                                 />
                    )}
                    {f.type === "number" && (
                      <input type="number" className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                                   required={f.required} 
                                 />
                    )}

                    {f.type === "checkbox_group" &&
                      <fieldset>
                        <legend className="font-medium text-gray-700 mb-1"></legend>
                      {f.options?.map((opt, idx) => (
                        <label key={idx} className="block text-gray-700">
                          <input type="checkbox" className="mr-2 accent-indigo-500"
                            required={f.required} 
                          /> {opt}
                        </label>
                        ))}
                      </fieldset>
                    }
                    {f.type === "radio_group" &&
                      f.options?.map((opt, idx) => (
                        <label key={idx} className="block text-gray-700">
                          <input type="radio" name={f.id} className="mr-2 accent-indigo-500"
                            required={f.required} 
                           /> {opt}
                        </label>
                      ))}

                    {f.type === "select" && (
                      <select className="border border-gray-300 rounded-md p-3 w-full 
                               focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                                 required={f.required} 
                               >
                        {f.options?.map((opt, idx) => (
                          <option key={idx}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {f.type === "boolean" && (
                      <label className="flex items-center text-gray-700">
                        <input type="checkbox" className="mr-2 accent-indigo-500"
                          required={f.required} 
                         /> Yes
                      </label>
                    )}
                  </div>
                ))}
                <button onClick={(e) => e.preventDefault()} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
