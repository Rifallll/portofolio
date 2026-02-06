import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rfxpsdckhcufiihfmqtj.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_tz9uOnj-VRVoTXuSrfJK5A_l5etU08L';

export const supabase = createClient(supabaseUrl, supabaseKey);
