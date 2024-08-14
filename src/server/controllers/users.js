//import dbConnect from "../utils/dbConnect";
import dbConnect from "@/server/utils/dbConnect";
import User from "@/server/models/User";

export async function createUserWithAccount(name, email, password, imagePath) {
  try {
    await dbConnect();
    console.log("Creating user with account: ", name, email, password);
    const newUser = new User({
      name,
      email,
      password,
      image: imagePath,
    });

    await newUser.save();
  } catch (error) {
    console.error("Error creating the user: ", error);
    throw error;
  }
}

// Function to get a user by email
export async function getUserByEmail(email) {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    return user ? user.toObject() : null;
  } catch (error) {
    console.error("Error getting user by email: ", error);
    throw error;
  }
}

// OTP functions

export async function setOtp(email, otp) {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.isverified === true) {
      throw new Error("User already verified");
    }
    user.otp = otp;

    await user.save();
  } catch (error) {
    console.error("Error setting otp: ", error);
    throw error;
  }
}

export async function getOtp(email) {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return user.otp;
  } catch (error) {
    console.error("Error getting otp: ", error);
    throw error;
  }
}

export async function setVerified(email) {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    user.isverified = true;
    user.otp = null;
    await user.save();
  } catch (error) {
    console.error("Error setting verified: ", error);
    throw error;
  }
}
