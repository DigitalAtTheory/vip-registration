export default function Input({
  name,
  type,
  label,
  placeholder,
  value,
  handleChange,
}) {
  return (
    <div className="mt-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-50 uppercase"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="shadow-sm focus:ring-gold-500 focus:border-gold-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
