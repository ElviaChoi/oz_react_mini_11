import { useSupabase } from "../context/UserContext";

export const useOAuth = () => {
  let supabase;
  try {
    supabase = useSupabase();
  } catch (error) {
    const mockAuth = (provider) => () => {
      console.warn(
        `Supabase not initialized. OAuth with '${provider}' is disabled.`
      );
      return Promise.resolve({ data: null, error: { message: "Supabase not initialized." } });
    };
    return {
      loginWithKakao: mockAuth("Kakao"),
      loginWithGoogle: mockAuth("Google"),
    };
  }

  // 카카오 로그인
  const loginWithKakao = async (redirectTo = null, ...otherOptions) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo,
          ...otherOptions,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  // 구글 로그인
  const loginWithGoogle = async (redirectTo = null, ...otherOptions) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          ...otherOptions,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return { loginWithKakao, loginWithGoogle };
};
