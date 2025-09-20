import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    schoolId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?\d{9,15}$/, "Please enter a valid phone number"], // optional regex
    },
    telegramId: {
      type: String,
      default: null,
    },
    photo: {
      type: String, // can be a URL or base64 string
      default: null,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "student", "security_guard"],
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false, // only matters for security_guard role
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
