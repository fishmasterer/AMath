// lib/supabase/server.ts
// Server-side Supabase client for use in API routes and Server Components

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Database } from '../database.types';

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component - ignore cookie setting errors
          }
        },
      },
    }
  );
};

// Middleware-specific client
export const createMiddlewareClient = async (request: NextRequest) => {
  // Create response for setting cookies
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  return supabase;
};

// Helper to get user profile with role
export const getUserProfile = async () => {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { user: null, profile: null, error: authError };
  }
  
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return { user, profile, error: profileError };
};

// Helper to check if user is tutor
export const isTutor = async () => {
  const { profile } = await getUserProfile();
  return profile?.role === 'tutor';
};

// Helper to check if user is student
export const isStudent = async () => {
  const { profile } = await getUserProfile();
  return profile?.role === 'student';
};
