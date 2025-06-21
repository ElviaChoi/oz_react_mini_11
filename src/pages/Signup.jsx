import { useState } from "react";
import FormInput from "../components/FormInput";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

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

    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(form.password)) {
      newErrors.password = "비밀번호는 영문자와 숫자의 조합이어야 합니다.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("회원가입 유효성 통과!");
      // TODO: supabase.auth.signUp() 연동 (4-2에서)
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <form
        className="bg-white w-full max-w-md p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
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
          placeholder="example@oz.com"
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
