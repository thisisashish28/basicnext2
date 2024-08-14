import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  isverified: { type: Boolean, default: false },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: null },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
