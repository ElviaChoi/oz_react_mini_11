function FormInput({ label, type, name, value, onChange, error, placeholder }) {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-full border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-sky-400 transition`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default FormInput;
