//import dbConnect from "../utils/dbConnect";
import dbConnect from '@/server/utils/dbConnect';
import User from '@/server/models/User';

export async function createUserWithAccount(
  full_name,
  email,
  password,
  imagePath,
) {
  try {
    await dbConnect();
    console.log('Creating user with account: ', full_name, email, password);
    const newUser = new User({
      full_name,
      email,
      password,
      image: imagePath,
    });

    await newUser.save();
  } catch (error) {
    console.error('Error creating the user: ', error);
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
    console.error('Error getting user by email: ', error);
    throw error;
  }
}

export const findUserOrCreate = async (email, full_name, image) => {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return user;
    } else {
      const newUser = new User({
        email,
        full_name,
        image,
      });
      await newUser.save();
      return newUser;
    }
  } catch (error) {
    console.error('Error creating the user: ', error);
    throw error;
  }
};
