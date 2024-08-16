import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import dbConnect from '@/server/utils/dbConnect';
import session from '@/server/models/session';
export async function POST(request) {
  try {
    const { email } = await request.json();
    await dbConnect();
    const existingSession = await session.findOne({ email });
    if (existingSession) {
      await existingSession.deleteOne();
    }
    const cookieHeaders = [
      serialize('customToken', '', {
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        secure: true,
      }),
    ];
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.headers.set('Set-Cookie', cookieHeaders.join(', '));
    return response;
  } catch (error) {
    console.error('Logout Error:', error);
    return NextResponse.json({ message: 'Error logging out' }, { status: 500 });
  }
}
