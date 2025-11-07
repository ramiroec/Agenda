import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wbqwflxalgkrplgqxbdf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndicXdmbHhhbGdrcnBsZ3F4YmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NjU2NTQsImV4cCI6MjA3ODA0MTY1NH0.vfyBrdK5cHPqznrr1TnrPa3dUwkQYUh8T3LKK-tpEEU'

export const supabase = createClient(supabaseUrl, supabaseKey)
