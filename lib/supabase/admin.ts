import { Database } from '@/lib/supabase/database.types'
import { createClient } from '@supabase/supabase-js'

export const createAdminClient = () =>
  createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
