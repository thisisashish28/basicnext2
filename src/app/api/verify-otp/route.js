import { NextResponse } from 'next/server';
import { getOtp, setVerified } from '@/server/controllers/auth';

export async function POST(req) {
  try {
    // Parse the request body
    const { email, otp } = await req.json();
    console.log(email, otp);

    // Validate input
    if (!email || !otp) {
      return NextResponse.json(
        { message: 'Email and OTP are required.' },
        { status: 400 },
      );
    }

    // Retrieve stored OTP and user details
    const storedData = await getOtp(email);

    if (!storedData || storedData !== otp) {
      return NextResponse.json({ message: 'Invalid OTP.' }, { status: 400 });
    }

    await setVerified(email);
    console.log('User verified successfully!');
    return NextResponse.json(
      { message: 'User verified successfully!' },
      { status: 201 },
    );
  } catch (error) {
    console.log('Error in OTP verification', error);
    return NextResponse.json(
      {
        message: 'Error',
        error: error.message || 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
