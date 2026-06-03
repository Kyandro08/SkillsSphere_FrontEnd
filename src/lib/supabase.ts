import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

// @ts-ignore - Constants.expoConfig.extra exists at runtime
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
// @ts-ignore
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
