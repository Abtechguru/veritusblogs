/* This file now reads from environment variables instead of hardcoded strings */

export const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || "";
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";