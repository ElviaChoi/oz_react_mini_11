const AuthLayout = ({ title, bgImage, children, onSubmit }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 backdrop-blur bg-black/40 z-0" />

      <form
        onSubmit={onSubmit}
        className="relative z-10 bg-white/90 backdrop-blur-sm w-full max-w-md p-8 rounded-xl shadow-lg hover:shadow-2xl hover:ring-1 hover:ring-sky-700 hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {title}
        </h2>
        {children}
      </form>
    </div>
  );
};

export default AuthLayout;
