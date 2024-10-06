'use server'

import { encodedRedirect, getURL } from '@/lib/utils'
import { createClient } from '@/lib/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: getURL('/api/auth/callback')
    }
  })

  if (error) {
    return encodedRedirect("error", "/login", error.message);
  }

  redirect(data.url)
}
