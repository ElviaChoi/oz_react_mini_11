function Avatar({ user, size = "md", onClick }) {
  const sizeMap = {
    sm: "w-10 h-10 text-sm",
    md: "w-16 h-16 text-xl",
    lg: "w-36 h-30 text-4xl",
  };
  const sizeClass = sizeMap[size] || sizeMap.md;

  const initials = user?.email?.charAt(0).toUpperCase() || "?";

  const avatarUrl = user?.avatarUrl || user?.user_metadata?.avatar_url || "";
  const hasImage =
    !!avatarUrl &&
    avatarUrl.trim() !== "" &&
    avatarUrl !== "/images/profile.png";

  return hasImage ? (
    <img
      src={avatarUrl}
      alt="profile"
      onClick={onClick}
      className={`${sizeClass} rounded-full object-cover cursor-pointer`}
    />
  ) : (
    <div
      onClick={onClick}
      className={`bg-sky-500 rounded-full flex items-center justify-center font-bold shadow-lg ring-4 ring-white/30 ${sizeClass} cursor-pointer`}
    >
      {initials}
    </div>
  );
}

export default Avatar;
