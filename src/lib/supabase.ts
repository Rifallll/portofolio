import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rqavqiuepoarwbgfqpkd.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxYXZxaXVlcG9hcndiZ2ZxcGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NTg3MTUsImV4cCI6MjA5MzUzNDcxNX0.Fhiz5d2n44l5wksp7aXcMPIfPyqW7_FCXmN9_Om7LnA';

// Safe initialization to prevent app crash if keys are missing/invalid
let client;
try {
    // Validate keys before init
    if (!supabaseUrl || !supabaseKey || supabaseKey.startsWith('sb_publishable')) {
        console.warn('⚠️ Invalid or missing Supabase credentials detected. Using mock client.');
        // Intentionally throw to trigger catch if key looks like Storyblok (sb_) instead of Supabase
        if (supabaseKey.startsWith('sb_publishable')) throw new Error("Invalid Supabase Key (Looks like Storyblok key)");
    }
    client = createClient(supabaseUrl, supabaseKey);
} catch (e) {
    console.error("❌ Supabase Init Failed:", e);
    // Mock client to allow app to render without crashing
    client = {
        auth: {
            signInWithPassword: async () => ({ data: null, error: { message: "System Error: Invalid Supabase Configuration. Check console." } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            getSession: async () => ({ data: { session: null }, error: null }),
            startAutoRefresh: () => { },
            stopAutoRefresh: () => { },
        },
        from: () => ({
            select: () => ({ limit: () => ({ data: [], error: null }) }),
            upsert: () => ({ data: null, error: null }),
            delete: () => ({ eq: () => ({ data: null, error: null }) })
        })
    } as any;
}

export const supabase = client;
