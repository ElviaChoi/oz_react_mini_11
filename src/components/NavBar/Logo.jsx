function Logo({ onClick }) {
  return (
    <a
      href="/" // Assuming onClick navigates to home
      className="text-5xl sm:text-5xl mb-3 font-bold cursor-pointer"
      onClick={onClick}
      aria-label="Pickflix 홈으로 이동"
    >
      🎬 Pickflix
    </a>
  );
}

export default Logo;
