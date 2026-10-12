import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://yfgidwohoromhrlgtmkp.supabase.co'
const supabaseKey = "sb_publishable_ghCXsDoapz7sjX1XAQIJ1g_w2wEQe5G"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;