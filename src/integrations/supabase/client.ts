import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ndrawgwpifeoxvvegiwi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcmF3Z3dwaWZlb3h2dmVnaXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzODg2NzgsImV4cCI6MjA3Njk2NDY3OH0.iJzzAylPQZQTBGYwGoEbpsxTow03-14q7pRxVmfNjlo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
