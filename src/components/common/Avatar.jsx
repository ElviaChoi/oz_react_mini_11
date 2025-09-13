function Avatar({ user, size = "md", onClick, ariaLabel, ariaHasPopup, ariaExpanded }) {
  const sizeMap = {
    sm: "w-10 h-10 text-sm",
    md: "w-16 h-16 text-xl",
    lg: "w-24 h-24 text-2xl",
    xl: "w-36 h-36 text-4xl",
  };
  const sizeClass = sizeMap[size] || sizeMap.md;

  const initials = user?.email?.charAt(0).toUpperCase() || "?";

  const avatarUrl = user?.avatarUrl || user?.user_metadata?.avatar_url || "";
  const hasImage =
    !!avatarUrl &&
    avatarUrl.trim() !== "" &&
    avatarUrl !== "/images/profile.png";

  return (
    <button
      onClick={onClick}
      className={`${sizeClass} aspect-square object-cover rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 transition`}
      aria-label={ariaLabel || "사용자 메뉴 토글"}
      aria-haspopup={ariaHasPopup}
      aria-expanded={ariaExpanded}
    >
      {hasImage ? (
        <img
          src={avatarUrl}
          alt={ariaLabel || "사용자 프로필 사진"}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div
          className={`bg-sky-500 rounded-full flex items-center justify-center font-bold shadow-lg ring-4 ring-white/30 w-full h-full`}
        >
          {initials}
        </div>
      )}
    </button>
  );
}

export default Avatar;
