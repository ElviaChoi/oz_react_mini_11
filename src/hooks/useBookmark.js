import { useEffect, useState } from "react";

function useBookmark(id) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 북마크 여부 확인
  const checkIsBookmarked = () => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    return saved.includes(id);
  };

  // 컴포넌트 마운트 시 북마크 상태 초기화
  useEffect(() => {
    setIsBookmarked(checkIsBookmarked());
  }, [id]);

  // 북마크 상태 업데이트 함수
  const updateBookmarks = (updaterFn) => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const updated = updaterFn(saved);

    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setIsBookmarked(updated.includes(id));
  };

  const addBookmark = () =>
    updateBookmarks((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const removeBookmark = () =>
    updateBookmarks((prev) => prev.filter((item) => item !== id));

  return { isBookmarked, addBookmark, removeBookmark };
}

export default useBookmark;
