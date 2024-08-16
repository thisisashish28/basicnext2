import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { setOtp } from '@/server/controllers/auth';
import { generateOtp } from '@/server/utils';

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: 'Name and email are required.' },
        { status: 400 },
      );
    }

    const otp = generateOtp(4);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Sign-Up',
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    await setOtp(email, otp);

    return NextResponse.json(
      { message: 'OTP sent successfully!' },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error in sending OTP:', error);
    return NextResponse.json(
      {
        message: 'Error',
        error: error.message || 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
