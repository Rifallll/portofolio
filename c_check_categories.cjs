
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rqavqiuepoarwbgfqpkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxYXZxaXVlcG9hcndiZ2ZxcGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NTg3MTUsImV4cCI6MjA5MzUzNDcxNX0.Fhiz5d2n44l5wksp7aXcMPIfPyqW7_FCXmN9_Om7LnA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCategories() {
    try {
        console.log('Fetching unique categories...');
        const { data, error } = await supabase.from('projects').select('category');
        if (error) {
            console.error('Error:', error);
        } else {
            const categories = [...new Set(data.map(item => item.category))];
            console.log('Categories in DB:', categories);
        }
    } catch (err) {
        console.error('Fatal Error:', err);
    }
}

checkCategories();
