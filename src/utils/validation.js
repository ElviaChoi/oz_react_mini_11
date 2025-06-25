//  1. 이메일 유효성 검사
export const validateEmail = (email) => {
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "올바른 이메일 양식으로 입력해주세요.";
  }
  return "";
};

//  2. 비밀번호 유효성 검사 (공통: 로그인/회원가입)
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return "비밀번호는 영문자 + 숫자 포함 8자 이상이어야 합니다.";
  }
  return "";
};

//  3. 비밀번호 확인 (회원가입)
export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다.";
  }
  return "";
};

//  4. 이름 유효성 검사 (회원가입)
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z0-9가-힣]{2,8}$/;
  if (!nameRegex.test(name)) {
    return "이름은 2~8자, 숫자/영문/한글만 가능합니다.";
  }
  return "";
};

// 🔸 5. 로그인 유효성 검사
export const validateLogin = (form) => {
  const errors = {};
  const emailError = validateEmail(form.email);
  const passwordError = validatePassword(form.password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
};

// 🔸 6. 회원가입 유효성 검사
export const validateSignup = (form) => {
  const errors = {};
  const nameError = validateName(form.name);
  const emailError = validateEmail(form.email);
  const passwordError = validatePassword(form.password);
  const confirmError = validateConfirmPassword(
    form.password,
    form.confirmPassword
  );

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (confirmError) errors.confirmPassword = confirmError;

  return errors;
};
