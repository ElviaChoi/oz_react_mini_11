import FormInput from "../common/FormInput";

function LoginFormInputs({ form, errors, onChange }) {
  return (
    <>
      <FormInput
        label="이메일"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        error={errors.email}
        placeholder="이메일 입력"
      />
      <FormInput
        label="비밀번호"
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        error={errors.password}
        placeholder="비밀번호 입력"
      />
    </>
  );
}

export default LoginFormInputs;
