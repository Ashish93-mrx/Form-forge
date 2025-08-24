import { type FormField } from "./useFormBuilder";

interface Props {
  field: FormField;
  onLabelChange: (id: string, label: string) => void;
  onOptionChange: (id: string, options: string[]) => void;
  onRemove: (id: string) => void;
  onToggleRequired: (id: string, required: boolean) => void;
}

export default function FieldItem({ field, onLabelChange, onOptionChange, onRemove, onToggleRequired  }: Props) {
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = field.options ? [...field.options] : [];
    newOptions[index] = value;
    onOptionChange(field.id, newOptions);
  };

  const addOption = () => {
    onOptionChange(field.id, [...(field.options || []), "New Option"]);
  };

return (
  <div className="p-4 border rounded-lg bg-white shadow-sm relative hover:shadow-md transition">
    <button
      type="button"
      onClick={() => onRemove(field.id)}
      className="absolute top-0 right-1 cursor-pointer text-gray-400 hover:text-red-500 transition"
      title="Remove field"
    >
      ✕
    </button>

    {/* Label Input */}
    <input
      type="text"
      value={field.label}
      onChange={(e) => onLabelChange(field.id, e.target.value)}
      placeholder="Field label"
      className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    />
    

    <small className="text-gray-500 text-xs">Type: {field.type}</small>
    {/* Required Toggle */}
<div className="mt-3 flex items-center gap-2">
  <input
    type="checkbox"
    checked={field.required}
    onChange={(e) => onToggleRequired(field.id, e.target.checked)}// 🔹 pass required
    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
  />
  <label className="text-sm text-gray-700">Required</label>
</div>


    {/* Options Section */}
    {(field.type === "checkbox_group" ||
      field.type === "radio_group" ||
      field.type === "select") && (
      <div className="mt-3">
        <p className="font-medium text-gray-700 text-sm mb-2">Options</p>
        {(field.options || []).map((opt, idx) => (
          <input
            key={idx}
            type="text"
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            placeholder={`Option ${idx + 1}`}
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        ))}
        <button
          type="button"
          onClick={addOption}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1 transition"
        >
          + Add Option
        </button>
      </div>
    )}
  </div>
);

}
