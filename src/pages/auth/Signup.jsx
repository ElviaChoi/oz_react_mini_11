import { useNavigate } from "react-router-dom";
import SignupFormInputs from "../../components/FormInputs/SignupFormInputs";
import { useSupabaseAuth } from "../../supabase";
import { validateSignup } from "../../utils/validation";
import { FiUserPlus } from "react-icons/fi";
import { useToast } from "../../components/Toast";
import useAuthForm from "../../hooks/useAuthForm";
import { PATHS } from "../../constants";
import AuthLayout from "../../components/auth/AuthLayout";

const baseButtonClasses = "w-full py-3 rounded-full font-semibold transition flex items-center justify-center gap-2";

function Signup() {
  const { form, errors, handleChange, validate } = useAuthForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateSignup
  );

  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await signUp({
        email: form.email,
        password: form.password,
        userName: form.name,
      });

      showToast("회원가입 성공!", "success");
      navigate(PATHS.LOGIN);
    } catch (error) {
      showToast(`회원가입 실패: ${error.message}`, "error");
    }
  };

  return (
    <AuthLayout
      title="🎉 회원가입 🎉"
      bgImage="/images/cinema-chairs.jpg"
      onSubmit={handleSubmit}
    >
      <SignupFormInputs form={form} errors={errors} onChange={handleChange} />

      <button
        className={`${baseButtonClasses} mt-6 bg-sky-400 hover:bg-sky-500 text-black`}
      >
        <FiUserPlus />
        회원가입
      </button>
    </AuthLayout>
  );
}

export default Signup;
