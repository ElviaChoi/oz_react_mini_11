import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/common/FormInput";
import { useSupabaseAuth } from "../supabase";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validation";

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
    const newErrors = {};

    const nameError = validateName(form.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(form.email);
    if (emailError) newErrors.emaail = emailError;

    const passwordError = validatePassword(form.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmError = validateConfirmPassword(
      form.password,
      form.confirmPassword
    );
    if (confirmError) newErrors.confirmPassword = confirmError;

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
      style={{
        backgroundImage: "url('/images/cinema-chairs.jpg')",
      }}
    >
      {/* 흐림 + 어두운 오버레이 */}
      <div className="absolute inset-0 backdrop-blur-xs bg-black/30 z-0" />

      {/* 회원가입 폼 */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/90 backdrop-blur-sm w-full max-w-md p-8 rounded-xl 
                   shadow-lg hover:shadow-2xl hover:ring-1 hover:ring-sky-700 
                   hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] 
                   transition-all duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          🎉 회원가입 🎉
        </h2>
        <FormInput
          label="이름"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="2~8자, 숫자/한글/영어 가능"
        />
        <FormInput
          label="이메일"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="example@pickflix.com"
        />
        <FormInput
          label="비밀번호"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="영문 + 숫자 조합"
        />
        <FormInput
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="비밀번호 확인"
        />
        <button className="w-full mt-6 py-3 bg-sky-400 hover:bg-sky-500 text-black rounded-full font-semibold transition">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
