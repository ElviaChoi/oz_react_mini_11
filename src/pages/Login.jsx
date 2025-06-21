import { useState } from "react";
import FormInput from "../components/FormInput";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = "올바른 이메일 양식으로 입력해주세요.";
    }

    if (form.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("로그인 유효성 통과!");
      // TODO: supabase.auth.signInWithPassword() 연동 (4-2에서)
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <form
        className="bg-white w-full max-w-md p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          로그인
        </h2>
        <FormInput
          label="이메일"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="이메일 입력"
        />
        <FormInput
          label="비밀번호"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="비밀번호 입력"
        />
        <button className="w-full mt-6 py-3 bg-sky-400 hover:bg-sky-500 text-black rounded-full font-semibold transition">
          로그인
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
