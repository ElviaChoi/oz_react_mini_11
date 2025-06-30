import FormInput from "../common/FormInput";

function SignupFormInputs({ form, errors, onChange }) {
  return (
    <>
      <FormInput
        label="이름"
        name="name"
        type="text"
        value={form.name}
        onChange={onChange}
        error={errors.name}
        placeholder="2~8자, 숫자/한글/영어 가능"
      />
      <FormInput
        label="이메일"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        error={errors.email}
        placeholder="example@pickflix.com"
      />
      <FormInput
        label="비밀번호"
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        error={errors.password}
        placeholder="영문 + 숫자 조합"
      />
      <FormInput
        label="비밀번호 확인"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={onChange}
        error={errors.confirmPassword}
        placeholder="비밀번호 확인"
      />
    </>
  );
}

export default SignupFormInputs;
