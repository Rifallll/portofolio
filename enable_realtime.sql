-- Enable Realtime for Projects
alter publication supabase_realtime add table projects;

-- Enable Realtime for Skills
alter publication supabase_realtime add table skills;

-- Enable Realtime for Experience
alter publication supabase_realtime add table experience;

-- Enable Realtime for Certificates
alter publication supabase_realtime add table certificates;
