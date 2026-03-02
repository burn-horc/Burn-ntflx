import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://camdkqqiftwlqmklllyl.supabase.co";
const supabaseAnonKey = "sb_publishable_HwUBclRI-4DQb_02rNoC1w_Gc8ETnal";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
