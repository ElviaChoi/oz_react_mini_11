import { useUserContext } from "../../supabase";
import { TEXTS } from "../../constants";
import UserProfile from "../../components/mypage/UserProfile";
import BookmarkList from "../../components/mypage/BookmarkList";

function MyPage() {
  const { user } = useUserContext();

  if (!user) {
    return <div className="text-center mt-10 text-red-500">{TEXTS.loginRequired}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 pt-[240px] sm:pt-[140px] md:pt-[150px] pb-24 text-white">
      <div className="max-w-4xl mx-auto bg-white/5 rounded-xl backdrop-blur p-8 shadow-xl border border-white/20">
        <UserProfile user={user} />
        <BookmarkList />
      </div>
    </div>
  );
}

export default MyPage;
