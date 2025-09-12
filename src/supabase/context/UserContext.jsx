import { createContext, useContext, useState } from "react";
import { supabaseEnv } from "../utilities";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  supabaseEnv.projectURL,
  supabaseEnv.apiKey
);

const SUPABASE = createContext(null);

const UserContext = createContext(null);

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <SUPABASE.Provider value={supabaseClient}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </SUPABASE.Provider>
  );
};

export const useSupabase = () => {
  const supabase = useContext(SUPABASE);

  if (!supabase) {
    throw new Error("supabase가 초기화 되지 않았습니다.");
  }

  return supabase;
};

export const useUserContext = () => useContext(UserContext);
