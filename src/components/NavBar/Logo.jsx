function Logo({ onClick }) {
  return (
    <div
      className="text-4xl sm:text-5xl font-bold cursor-pointer"
      onClick={onClick}
    >
      🎬 Pickflix
    </div>
  );
}

export default Logo;
