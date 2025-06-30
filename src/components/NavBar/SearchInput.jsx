function SearchInput({ value, onChange, onKeyDown }) {
  return (
    <div className="w-full sm:flex-1 mb-3 sm:px-6 flex justify-center">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="🔍 영화 제목을 검색하세요"
        className="w-full max-w-md px-5 py-2 rounded-full bg-gray-200 text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
      />
    </div>
  );
}

export default SearchInput;
