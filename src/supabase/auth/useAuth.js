import { useSupabase } from "..";
import {
  changeFromDto,
  DTO_TYPE,
  localStorageUtils,
  USER_INFO_KEY,
} from "../utilities";

export const useAuth = () => {
  const supabase = useSupabase();
  const {
    getItemFromLocalStorage,
    removeItemFromLocalStorage,
    setItemToLocalStorage,
  } = localStorageUtils();

  const logout = async () => {
    removeItemFromLocalStorage(USER_INFO_KEY.sbKey);
    removeItemFromLocalStorage(USER_INFO_KEY.customKey);
    return await supabase.auth.signOut();
  };

  const getUserInfo = async () => {
    const data = getItemFromLocalStorage(USER_INFO_KEY.sbKey);
    if (data) {
      const userInfo = changeFromDto({
        type: data.user ? DTO_TYPE.user : DTO_TYPE.error,
        dto: data,
      });
      if (userInfo.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
      }
      return userInfo;
    } else {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) return;
        const userInfo = changeFromDto({
          type: !error ? DTO_TYPE.user : DTO_TYPE.error,
          dto: { user: data.user, error },
        });
        if (userInfo.user) {
          setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
        }
        return userInfo;
      } catch (error) {}
    }
  };
  return { logout, getUserInfo };
};
