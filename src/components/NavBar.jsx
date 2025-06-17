function NavBar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* 로고 */}
      <div className="text-xl font-bold flex items-center">
        <span className="text-white ml-1">영화 추천</span>
      </div>

      {/* 검색창 */}
      <div className="flex-1 px-6">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full max-w-md px-4 py-2 rounded-full bg-gray-200 text-black"
        />
      </div>

      {/* 로그인/회원가입 */}
      <div className="space-x-2">
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
          로그인
        </button>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
          회원가입
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
