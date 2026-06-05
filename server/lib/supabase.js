// Initializes and exports a single Supabase client for server-side use.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    "[supabase] WARNING: SUPABASE_URL or SUPABASE_SERVICE_KEY is missing. Auth features will not work."
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;
