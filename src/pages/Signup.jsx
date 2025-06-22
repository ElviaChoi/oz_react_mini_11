import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useSupabaseAuth } from "../supabase";

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

    if (!/^[a-zA-Z0-9가-힣]{2,8}$/.test(form.name)) {
      newErrors.name = "이름은 2~8자, 숫자/영문/한글만 가능합니다.";
    }

    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(form.password)) {
      newErrors.password = "비밀번호는 영문자+숫자 포함 8자 이상이어야 합니다.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

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
