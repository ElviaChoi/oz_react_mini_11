import { supabaseEnv } from "./env";

// localStorage Key
const projectID = supabaseEnv.projectURL?.split('//')[1]?.split('.')[0];

export const USER_INFO_KEY = {
  sbKey: projectID ? `sb-${projectID}-auth-token` : 'sb-auth-token',
  customKey: 'userInfo',
};

// data transfer object type
export const DTO_TYPE = {
  user: "user",
  error: "error",
};
