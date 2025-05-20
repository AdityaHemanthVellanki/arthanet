import { NextResponse } from 'next/server';

// This route handler serves the favicon
export async function GET() {
  // For a simple icon route, we can redirect to the static favicon
  // or serve a dynamic icon based on some logic
  
  // For now, we'll just return a simple response
  return new NextResponse(null, {
    status: 307, // Temporary redirect
    headers: {
      'Location': '/favicon.ico'
    }
  });
}
