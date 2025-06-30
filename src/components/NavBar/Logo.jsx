function Logo({ onClick }) {
  return (
    <div
      className="text-5xl sm:text-5xl mb-3 font-bold cursor-pointer"
      onClick={onClick}
    >
      🎬 Pickflix
    </div>
  );
}

export default Logo;
