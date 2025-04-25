import { NextResponse } from 'next/server';

export function authorRedirect(req) {
  try {
    // Get user role from cookies
    const role = req.cookies.get('_r');
    const user = req.cookies.get('user');

    if (role?.value === 'author') {
      // Author-specific routes
      const authorRoutes = ['/dashboard', '/books', '/settings'];
      const { pathname } = req.nextUrl;

      // If author tries to access admin routes, redirect to author dashboard
      if (!authorRoutes.includes(pathname) && !pathname.startsWith('/books/')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      // For book routes, ensure author can only access their own books
      if (pathname.startsWith('/books/')) {
        const bookId = pathname.split('/')[2];
        // Add logic here to verify book ownership if needed
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Author redirect middleware error:', error);
    return NextResponse.next();
  }
}