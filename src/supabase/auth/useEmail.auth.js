import { useSupabase } from "..";
import {
  changeFromDto,
  DTO_TYPE,
  localStorageUtils,
  USER_INFO_KEY,
} from "../utilities";

export const useEmailAuth = () => {
  const supabase = useSupabase();
  const { setItemToLocalStorage } = localStorageUtils();

  // 회원가입
  const signUp = async ({ email, password, ...userData }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            avatar_url:
              "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_1280.png",
            ...userData,
          },
        },
      });

      const userInfo = changeFromDto({
        type: !error ? DTO_TYPE.user : DTO_TYPE.error,
        dto: { user: data.user, error },
      });

      if (userInfo.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
        return userInfo;
      } else {
        throw new Error(
          `status: ${userInfo.error.status}, message: ${userInfo.error.message}`
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // 로그인
  const login = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      const userInfo = changeFromDto({
        type: !error ? DTO_TYPE.user : DTO_TYPE.error,
        dto: { user: data.user, error },
      });

      if (userInfo.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
        return userInfo;
      } else {
        throw new Error(
          `status: ${userInfo.error.status}, message: ${userInfo.error.message}`
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateUserName = async (userName) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          user_name: userName,
        },
      });

      if (error) throw new Error(error.message);

      const updatedUserInfo = changeFromDto({
        type: DTO_TYPE.user,
        dto: { user: data.user, error },
      });

      setItemToLocalStorage(USER_INFO_KEY.customKey, updatedUserInfo);
      return updatedUserInfo;
    } catch (err) {
      throw new Error("닉네임 변경 실패: " + err.message);
    }
  };

  return {
    signUp,
    login,
    updateUserName,
  };
};
