import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFormBuilder } from "./useFormBuilder";
import FieldItem from "./FieldItem";
import SortableField from "./SortableField";
import { useEffect, useRef, useState } from "react";
import { back, publish } from "../../../assets";
import { useNavigate } from "react-router-dom";
import type { FormBuilderProps } from "../../../types/FormBuilder";

const FIELD_TYPES = [
  { type: "short_text" as const, label: "Short Text" },
  { type: "long_text" as const, label: "Paragraph" },
  { type: "email" as const, label: "Email" },
  { type: "phone" as const, label: "Phone" },
  { type: "url" as const, label: "URL" },
  { type: "password" as const, label: "Password" },
  { type: "checkbox_group" as const, label: "Checkboxes" },
  { type: "radio_group" as const, label: "Multiple Choice" },
  { type: "boolean" as const, label: "Yes/No" },
  { type: "select" as const, label: "Dropdown" },
  { type: "date" as const, label: "Date" },
  { type: "time" as const, label: "Time" },
  { type: "number" as const, label: "Number" },
  { type: "file" as const, label: "File Upload" },
];

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
    updateLogo,
    removeField,
    addField,
    reorderFields,
    toggleRequired,
  } = useFormBuilder(initialFields, initialSettings, initialMeta);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 120);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePublish = () => {
    const safeFields = fields.map((f) => ({
      ...f,
      options: f.options ?? [],
    }));

    const safeMeta = {
      title: formMeta.title || "Untitled Form",
      subtitle: formMeta.subtitle || "",
      logo: formMeta.logo || "",
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
    <div className="bg-gray-150 p-2">
      <div className="grid font-Mont h-screen grid-cols-1 md:grid-cols-[40%_60%] gap-1">
        <div
          className="bg-white shadow-md rounded-lg pt-2 border border-gray-200 
             max-h-[90vh] h-screen overflow-y-auto flex flex-col
             scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 
             hover:scrollbar-thumb-gray-500"
        >
          <div className="px-6 pt-4">
            <div>
              <div className="flex flex-row items-center justify-between pb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Form Settings
                </h2>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={back} className="h-4" alt="back icon" />
                <span>Back</span>
              </button>
              </div>
            </div>
            <hr className="pt-3 pb-3" />

            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-3">
                Company Logo / Profile Image
              </label>
              <div className="flex flex-col items-center gap-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-24 h-24 rounded-full border-4 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group"
                >
                  {formMeta.logo ? (
                    <>
                      <img
                        src={formMeta.logo}
                        alt="Logo"
                        className="w-full h-full object-cover rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <svg
                        className="w-8 h-8 text-gray-400 mx-auto mb-1 group-hover:text-indigo-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <p className="text-xs text-gray-500 group-hover:text-indigo-500 transition-colors">
                        Upload
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                {formMeta.logo && (
                  <button
                    type="button"
                    onClick={() => updateLogo("")}
                    className="text-sm text-red-600 hover:text-red-800 font-medium cursor-pointer"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            <label
              htmlFor="formTitle"
              className="block font-medium text-gray-700 mb-1"
            >
              Company / Project Name
            </label>
            <input
              type="text"
              value={formMeta.title}
              onChange={(e) => updateTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full mb-3 
                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-blue-400"
            />
            <input
              type="text"
              value={formMeta.subtitle}
              onChange={(e) => updateSubtitle(e.target.value)}
              placeholder="Form Purpose (e.g., Job Application, Survey)"
              className="border border-gray-300 rounded-md p-3 w-full mb-6 
                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-blue-500"
              required
            />

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

            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Your Form
            </h2>
            <div className="space-y-3 flex-1">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={fields.map((f) => f.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {fields.map((field) => (
                    <SortableField key={field.id} id={field.id}>
                      <div className="">
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
          </div>

          <div className="sticky bottom-0 px-4 left-0 right-0  bg-white mt-6">
            <div className="pt-4 pb-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">
                Add Fields
              </h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {FIELD_TYPES.map((ft) => (
                  <button
                    key={ft.type}
                    onClick={() => {
                      addField(ft.type);
                      scrollToBottom();
                    }}
                    className="
          bg-gradient-to-br from-indigo-50 to-indigo-100 
          text-indigo-700 border border-indigo-200 
          px-3 py-2 rounded-lg text-sm font-medium
          shadow-sm hover:shadow-md
          hover:from-indigo-100 hover:to-indigo-200
          active:scale-95 active:shadow-inner
          transition-all duration-150 ease-out
          cursor-pointer select-none
          "
                  >
                    {ft.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div ref={bottomRef} />
        </div>

        <div className="h-screen">
          <div className="flex justify-between items-center px-2 pb-3 pt-2 bg-[#e7ecff] rounded-md">
            <div>
            </div>
            <div>
              <button
                onClick={handlePublish}
                className="bg-green-600 hover:bg-green-700
                      text-white
                      px-2 py-1 rounded-sm
                      shadow-md hover:shadow-lg
                      transition cursor-pointer flex items-center gap-1 justify-around
                      "
              >
                <span>Publish Form</span>
                <img src={publish} className="h-5" />
              </button>
            </div>
          </div>
          <div
            style={{ backgroundColor: formSettings.backgroundColor }}
            className="p-7 shadow-inner border border-gray-200 max-h-[80vh] overflow-y-auto justify-center"
          >
            <div className="flex items-center justify-center">
              <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                {formMeta.logo && (
                  <div className="flex justify-center mb-6">
                    <img
                      src={formMeta.logo}
                      alt="Company Logo"
                      className="w-20 h-20 object-cover rounded-full shadow-md"
                    />
                  </div>
                )}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {formMeta.title}
                </h1>
                {formMeta.subtitle && (
                  <p className="text-gray-600 mb-6">{formMeta.subtitle}</p>
                )}

                <form className="space-y-5">
                  {fields.map((f) => (
                    <div key={f.id}>
                      <label
                        htmlFor={`field-${f.id}`}
                        className="block mb-1 font-medium text-gray-700"
                      >
                        {f.label}
                      </label>

                      {f.type === "long_text" && (
                        <textarea
                          className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-indigo-500"
                          required={f.required}
                        />
                      )}
                      {f.type === "short_text" && (
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-indigo-500"
                          required={f.required}
                        />
                      )}
                      {f.type === "email" && (
                        <input
                          type="email"
                          className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-indigo-500"
                          required={f.required}
                        />
                      )}
                      {f.type === "date" && (
                        <input
                          type="date"
                          className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-indigo-500"
                          required={f.required}
                        />
                      )}
                      {f.type === "number" && (
                        <input
                          type="number"
                          className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-indigo-500"
                          required={f.required}
                        />
                      )}
                      {f.type === "phone" && (
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-indigo-500"
                          required={f.required}
                        />
                      )}
                      {f.type === "url" && (
                        <input
                          type="url"
                          placeholder="https://example.com"
                          className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-indigo-500"
                          required={f.required}
                        />
                      )}
                      {f.type === "password" && (
                        <input
                          type="password"
                          className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-indigo-500"
                          required={f.required}
                        />
                      )}
                      {f.type === "time" && (
                        <input
                          type="time"
                          className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-indigo-500"
                          required={f.required}
                        />
                      )}
                      {f.type === "file" && (
                        <input
                          type="file"
                          className="border border-gray-300 rounded-md p-3 w-full 
                                 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-indigo-500"
                          required={f.required}
                        />
                      )}

                      {f.type === "checkbox_group" && (
                        <fieldset>
                          {f.options?.map((opt, idx) => (
                            <label
                              key={idx}
                              className="flex items-center space-x-2 text-gray-700"
                            >
                              <input
                                type="checkbox"
                                className="w-5 h-5 accent-indigo-500"
                                required={f.required}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </fieldset>
                      )}
                      {f.type === "radio_group" &&
                        f.options?.map((opt, idx) => (
                          <label
                            key={idx}
                            className="flex items-center space-x-2 text-gray-700 mb-1"
                          >
                            <input
                              type="radio"
                              name={f.id}
                              className="w-5 h-5 cursor-pointer text-blue-600 border-gray-300 focus:ring-blue-500"
                              required={f.required}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}

                      {f.type === "select" && (
                        <div className="relative" ref={dropdownRef}>
                          <div
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === f.id ? null : f.id,
                              )
                            }
                            className="
      border border-gray-300 bg-white
      rounded-lg px-4 py-3
      flex justify-between items-center
      cursor-pointer
      hover:border-gray-400
      hover:shadow-sm
      transition-all duration-150
      "
                          >
                            <span
                              className={
                                values[f.id] ? "text-gray-800" : "text-gray-400"
                              }
                            >
                              {values[f.id] || "Select option"}
                            </span>

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
                              {f.options?.map((opt, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    setValues((prev) => ({
                                      ...prev,
                                      [f.id]: opt,
                                    }));
                                    setOpenDropdown(null);
                                  }}
                                  className="
            px-4 py-3
            hover:bg-indigo-50
            hover:text-indigo-600
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
                        </div>
                      )}

                      {f.type === "boolean" && (
                        <label className="flex items-center text-gray-700">
                          <input
                            type="checkbox"
                            className="mr-2 accent-indigo-500"
                            required={f.required}
                          />{" "}
                          Yes
                        </label>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-5 py-3 rounded-lg 
                     font-medium shadow-md transition"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
