import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vhkyoconiayqwtdxickg.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoa3lvY29uaWF5cXd0ZHhpY2tnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5OTQzNzUsImV4cCI6MjAzODU3MDM3NX0.erVdi1gxUEiVDqz1ykkR8KWZOzUQQmLOglnNCn12mwo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
