import { useNavigate } from "react-router-dom";
import LoginFormInputs from "../../components/FormInputs/LoginFormInputs";
import { useSupabaseAuth, useUserContext } from "../../supabase";
import { getRedirectUrl } from "../../utils/oauth";
import { validateLogin } from "../../utils/validation";
import { FiLogIn } from "react-icons/fi";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "../../components/Toast";
import { PATHS } from "../../constants";
import useAuthForm from "../../hooks/useAuthForm";
import AuthLayout from "../../components/auth/AuthLayout";

const baseButtonClasses = "w-full py-3 rounded-full font-semibold transition flex items-center justify-center gap-2";

function Login() {
  const { form, errors, handleChange, validate } = useAuthForm(
    { email: "", password: "" },
    validateLogin
  );

  const navigate = useNavigate();
  const { login, loginWithKakao, loginWithGoogle } = useSupabaseAuth();
  const { setUser } = useUserContext();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await login({ email: form.email, password: form.password });
      if (res?.user) setUser(res.user);
      navigate(PATHS.HOME);
    } catch (error) {
      showToast(`로그인 실패: ${error.message}`, "error");
    }
  };

  return (
    <AuthLayout
      title="로그인"
      bgImage="/images/MoviePoster.jpg"
      onSubmit={handleSubmit}
    >
      <LoginFormInputs form={form} errors={errors} onChange={handleChange} />

      <button
        type="submit"
        className={`${baseButtonClasses} mt-6 bg-sky-400 hover:bg-sky-500 text-black`}
      >
        <FiLogIn />
        로그인
      </button>

      <button
        onClick={() => loginWithKakao(getRedirectUrl())}
        type="button"
        className={`${baseButtonClasses} mt-4 bg-yellow-300 hover:bg-yellow-400 text-black`}
      >
        <RiKakaoTalkFill />
        카카오로 로그인
      </button>

      <button
        onClick={() => loginWithGoogle(getRedirectUrl())}
        type="button"
        className={`${baseButtonClasses} mt-4 bg-white border border-gray-50 hover:bg-gray-100 text-black`}
      >
        <FcGoogle />
        구글로 로그인
      </button>

      <p className="text-center mt-6 text-sm text-gray-600">
        Pickflix가 처음이신가요?{" "}
        <a href={PATHS.SIGNUP} className="text-sky-400 underline font-semibold">
          간편 가입
        </a>
      </p>
    </AuthLayout>
  );
}

export default Login;
