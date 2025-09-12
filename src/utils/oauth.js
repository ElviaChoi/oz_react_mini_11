export const getRedirectUrl = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:5173";
  } else {
    return "https://my-production-domain.com";
  }
};
