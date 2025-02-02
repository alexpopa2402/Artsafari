/* // components/SessionLoader.tsx
import { useEffect } from 'react'
import {supabase} from '@services/supabaseClient'
import { useAuthStore } from 'stores/useAuthStore'

export default function SessionLoader() {
  const { setUser, setProfile, setIsLoading } = useAuthStore()

  useEffect(() => {
    let isMounted = true // Cleanup flag

    const getProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) throw error
        if (isMounted) setProfile(data)
      } catch (error) {
        console.error('Profile fetch error:', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (isMounted) {
          setIsLoading(true)
          const user = session?.user || null
          setUser(user)
          
          if (user) {
            await getProfile(user.id)
          } else {
            setProfile(null)
            setIsLoading(false)
          }
        }
      }
    )

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return
      
      const user = session?.user || null
      setUser(user)
      
      if (user) {
        getProfile(user.id)
      } else {
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [])

  return null
} */

//final robust version 
/* import { useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useAuthStore } from '../stores/authStore'

export default function SessionLoader() {
  const supabase = useSupabaseClient()
  const { setUser, setProfile, setLoading } = useAuthStore()

  useEffect(() => {
    let isMounted = true

    const handleAuthChange = async (event: string, session: Session | null) => {
      if (!isMounted) return

      setLoading(true)
      const user = session?.user ?? null
      setUser(user)

      try {
        if (user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (error) throw error
          if (isMounted) setProfile(profile)
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error('Auth state change error:', error)
        if (isMounted) setProfile(null)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange)

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return
      handleAuthChange('INITIAL_SESSION', session)
    })

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [])

  return null
} */

// components/SessionLoader.tsx
/* import { useEffect } from 'react'
import { supabase } from '@services/supabaseClient'
import { useAuthStore } from 'stores/useAuthStore'

export default function SessionLoader() {
  const { setProfile, setIsLoading } = useAuthStore();

  useEffect(() => {
    let isMounted = true; // Cleanup flag

    const handleAuthChange = async (_event: string, session: any) => {
      if (!isMounted) return;

      setIsLoading(true);

      try {
        if (session?.user) {
          // Profile is guaranteed to exist after registration
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (error) throw error;

          // Merge auth user data with profile
          const mergedProfile = {
            ...profile,
            email: session.user.email // Always fresh from auth
          };

          setProfile(mergedProfile)
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error('Auth error:', error)
        setProfile(null)
      } finally {
        setIsLoading(false)
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthChange('INITIAL_SESSION', session)
    });

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    };
  }, []);

  return null;
}; */