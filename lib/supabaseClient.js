import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://oinyrbnuthzjghymzdkn.supabase.co'
const supabaseKey = "sb_publishable_1XiiJH7sbImMG7PBmneafw_kiJM8bLT"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;