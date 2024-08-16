import dbConnect from '@/server/utils/dbConnect';
import User from '@/server/models/User';

export async function setOtp(email, otp) {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.isverified === true) {
      throw new Error('User already verified');
    }
    user.otp = otp;

    await user.save();
  } catch (error) {
    console.error('Error setting otp: ', error);
    throw error;
  }
}

export async function getOtp(email) {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user.otp;
  } catch (error) {
    console.error('Error getting otp: ', error);
    throw error;
  }
}

export async function setVerified(email) {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    user.isverified = true;
    user.otp = null;
    await user.save();
  } catch (error) {
    console.error('Error setting verified: ', error);
    throw error;
  }
}
