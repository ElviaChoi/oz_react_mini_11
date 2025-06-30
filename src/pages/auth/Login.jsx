import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormInputs from "../../components/FormInputs/LoginFormInputs";
import { useSupabaseAuth, useUserContext } from "../../supabase";
import { getRedirectUrl } from "../../utils/oauth";
import { validateLogin } from "../../utils/validation";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { login, loginWithKakao, loginWithGoogle } = useSupabaseAuth();
  const { setUser } = useUserContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = validateLogin(form);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await login({ email: form.email, password: form.password });
      if (res?.user) setUser(res.user);
      navigate("/");
    } catch (error) {
      alert(`로그인 실패: ${error.message}`);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url('/images/MoviePoster.jpg')" }}
    >
      <div className="absolute inset-0 backdrop-blur bg-black/40 z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/90 backdrop-blur-sm w-full max-w-md p-8 rounded-xl shadow-lg hover:shadow-2xl hover:ring-1 hover:ring-sky-700 hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          로그인
        </h2>

        <LoginFormInputs form={form} errors={errors} onChange={handleChange} />

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-sky-400 hover:bg-sky-500 text-black rounded-full font-semibold transition"
        >
          로그인
        </button>

        <button
          onClick={() => loginWithKakao(getRedirectUrl())}
          type="button"
          className="w-full mt-4 py-3 bg-yellow-300 hover:bg-yellow-400 text-black rounded-full font-semibold transition"
        >
          카카오로 로그인
        </button>

        <button
          onClick={() => loginWithGoogle(getRedirectUrl())}
          type="button"
          className="w-full mt-4 py-3 bg-white border border-gray-50 hover:bg-gray-100 text-black rounded-full font-semibold transition"
        >
          구글로 로그인
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Pickflix가 처음이신가요?{" "}
          <a href="/signup" className="text-sky-400 underline font-semibold">
            간편 가입
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
