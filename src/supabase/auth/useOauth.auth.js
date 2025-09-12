import { useSupabase } from "../context/UserContext";

export const useOAuth = () => {
  const supabase = useSupabase();
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
