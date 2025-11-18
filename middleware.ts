// middleware.ts
// Authentication and route protection middleware

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from './src/lib/supabase/supabase-server';

export async function middleware(request: NextRequest) {
  const supabase = await createMiddlewareClient(request);
  
  // Get user session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  const { pathname } = request.nextUrl;
  
  // Public routes (accessible without authentication)
  const publicRoutes = ['/login', '/signup'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // If not authenticated and trying to access protected route
  if (!session && !isPublicRoute) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // If authenticated and trying to access auth pages
  if (session && isPublicRoute) {
    // Get user profile to determine role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    // Redirect to appropriate dashboard
    if (profile?.role === 'tutor') {
      return NextResponse.redirect(new URL('/tutor/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/student/homework', request.url));
    }
  }
  
  // Role-based route protection
  if (session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    // Protect tutor routes
    if (pathname.startsWith('/tutor') && profile?.role !== 'tutor') {
      return NextResponse.redirect(new URL('/student/homework', request.url));
    }
    
    // Protect student routes
    if (pathname.startsWith('/student') && profile?.role !== 'student') {
      return NextResponse.redirect(new URL('/tutor/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
