import { Database } from '@/lib/utils/supabase/database.types'
import { createBrowserClient } from '@supabase/ssr'

export function createAdminClient() {
  return createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
