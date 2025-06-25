//email 유효성 검사
export const validateEmail = (email) => {
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "올바른 이메일 양식으로 입력해주세요.";
  }
  return "";
};

// password 유효성 검사 (Login + SignUp)
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return "비밀번호는 영문자 + 숫자 포함 8자 이상이어야 합니다.";
  }
  return "";
};

// password 확인 유효성 검사 (SignUp Confirm)
export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다.";
  }
  return "";
};

// SignUP 유효성 검사
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z0-9가-힣]{2,8}$/;
  if (!nameRegex.test(name)) {
    return "이름은 2~8자, 숫자/영문/한글만 가능합니다.";
  }
  return "";
};
