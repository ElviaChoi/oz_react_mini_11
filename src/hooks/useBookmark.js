import { useEffect, useState } from "react";

function useBookmark(id) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const checkIsBookmarked = () => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    return saved.includes(id);
  };

  useEffect(() => {
    setIsBookmarked(checkIsBookmarked());
  }, [id]);

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
