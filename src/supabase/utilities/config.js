import { supabaseEnv } from "./env";

export const USER_INFO_KEY = {
  sbKey: `sb-${supabaseEnv.projectURL.split("//")[1].split(".")[0]}-auth-token`,
  customKey: "userInfo",
};

export const DTO_TYPE = {
  user: "user",
  error: "error",
};
