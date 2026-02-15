import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Server base URL
export const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-5bb3fa81`;
