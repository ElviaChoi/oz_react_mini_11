const FAKE_URL = "https://fake.supabase.co";
const FAKE_KEY = "fake-anon-key";

export const supabaseEnv = {
  apiKey: import.meta.env.VITE_SUPABASE_API_KEY || FAKE_KEY,
  projectURL: import.meta.env.VITE_SUPABASE_PROJECT_URL || FAKE_URL,
};
