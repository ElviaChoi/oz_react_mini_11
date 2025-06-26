import { useUserContext } from "../../supabase";
import { useEffect, useState } from "react";

function MyPage() {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-400">
        유저 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500">로그인이 필요합니다.</div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* 왼쪽 프로필 */}
          <div className="w-32 h-32 bg-sky-400 text-white rounded-full ml-6 mr-7 flex items-center justify-center text-4xl font-bold">
            {user.email?.charAt(0).toUpperCase()}
          </div>

          {/* 유저 정보 */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h2 className="text-2xl font-semibold">{user.userName}</h2>
              <button className="text-sm text-sky-500 hover:underline">
                닉네임 수정
              </button>
            </div>
            <p className="text-gray-600 mt-1">{user.email}</p>
            <button className="mt-4 text-sm text-sky-500 hover:underline">
              프로필 이미지 수정
            </button>
          </div>
        </div>

        {/* 북마크 섹션 자리 */}
        {/* 북마크 섹션 */}
        <div className="mt-12 border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">북마크</h3>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => alert("북마크를 비우시겠습니까?")}
            >
              🗑️
            </button>
          </div>
          <p className="text-gray-500">아직 북마크한 영화가 없습니다.</p>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
