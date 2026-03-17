import 'server-only'

import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getSession = cache(async () => {
  const supabase = await createClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Failed to fetch session:', error)
    return null
  }
})

export const getUser = cache(async () => {
  const supabase = await createClient()
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return null
  }
})

export async function verifySession() {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }

  return { isAuth: true, user }
}
