import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupFormInputs from "../components/auth/SignupFormInputs";
import { useSupabaseAuth } from "../supabase";
import { validateSignup } from "../utils/validation";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = validateSignup(form);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await signUp({
        email: form.email,
        password: form.password,
        userName: form.name,
      });

      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      alert(`회원가입 실패: ${error.message}`);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url('/images/cinema-chairs.jpg')" }}
    >
      <div className="absolute inset-0 backdrop-blur-xs bg-black/30 z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/90 backdrop-blur-sm w-full max-w-md p-8 rounded-xl shadow-lg hover:shadow-2xl hover:ring-1 hover:ring-sky-700 hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          🎉 회원가입 🎉
        </h2>

        <SignupFormInputs form={form} errors={errors} onChange={handleChange} />

        <button className="w-full mt-6 py-3 bg-sky-400 hover:bg-sky-500 text-black rounded-full font-semibold transition">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
