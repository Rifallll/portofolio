
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rqavqiuepoarwbgfqpkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxYXZxaXVlcG9hcndiZ2ZxcGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NTg3MTUsImV4cCI6MjA5MzUzNDcxNX0.Fhiz5d2n44l5wksp7aXcMPIfPyqW7_FCXmN9_Om7LnA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    try {
        console.log('Fetching projects to check columns...');
        const { data, error } = await supabase.from('projects').select('*').limit(1);
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Columns found:', Object.keys(data[0] || {}));
        }
    } catch (err) {
        console.error('Fatal Error:', err);
    }
}

checkSchema();
